
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { initialPagos, initialPropietarios } from '../data/mockData';
import { Currency, Pago } from '../types';
import Modal from '../components/Modal';

interface PagosViewProps {
    currentCurrency: Currency;
}

const PagosView: React.FC<PagosViewProps> = ({ currentCurrency }) => {
    const [pagos, setPagos] = useState<Pago[]>(initialPagos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPagoData, setNewPagoData] = useState({
        propietarioId: initialPropietarios[0]?.id || '',
        fecha: new Date().toISOString().split('T')[0],
        monto: '',
        metodo: 'Transferencia' as Pago['metodo'],
        concepto: '',
    });

    const USD_TO_VES_RATE = 300;

    const formatCurrency = (amount: number) => {
        const finalAmount = currentCurrency === 'VES' ? amount * USD_TO_VES_RATE : amount;
        const prefix = currentCurrency === 'VES' ? 'Bs.' : '$';
        const formattedAmount = finalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return `${prefix} ${formattedAmount}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPagoData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedPropietario = initialPropietarios.find(p => p.id === newPagoData.propietarioId);
        const monto = parseFloat(newPagoData.monto);

        if (selectedPropietario && newPagoData.concepto && monto > 0) {
            const nuevoPago: Pago = {
                id: crypto.randomUUID(),
                propietarioId: selectedPropietario.id,
                propietarioNombre: selectedPropietario.nombre,
                apartamento: selectedPropietario.apartamento,
                fecha: newPagoData.fecha,
                monto: monto,
                metodo: newPagoData.metodo,
                concepto: newPagoData.concepto,
            };
            setPagos([nuevoPago, ...pagos]);
            setIsModalOpen(false);
            setNewPagoData({
                propietarioId: initialPropietarios[0]?.id || '',
                fecha: new Date().toISOString().split('T')[0],
                monto: '',
                metodo: 'Transferencia',
                concepto: '',
            });
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Registro de Pagos</h1>
                    <p className="text-slate-500">Consulta y gestiona los pagos de cuotas y otros conceptos.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5"/>
                    <span>Registrar Nuevo Pago</span>
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b bg-slate-50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-600">Propietario</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Fecha de Pago</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Concepto</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Método</th>
                                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map((p, index) => (
                                <tr key={p.id} className={`border-b ${index === pagos.length - 1 ? 'border-none' : ''}`}>
                                    <td className="p-4">
                                        <p className="font-medium text-slate-800">{p.propietarioNombre}</p>
                                        <p className="text-sm text-slate-500">{p.apartamento}</p>
                                    </td>
                                    <td className="p-4 text-slate-500">{new Date(p.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td className="p-4 text-slate-600">{p.concepto}</td>
                                    <td className="p-4 text-slate-500">{p.metodo}</td>
                                    <td className="p-4 text-slate-800 font-semibold text-right">{formatCurrency(p.monto)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Pago">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="propietarioId" className="block text-sm font-medium text-slate-700 mb-1">Propietario</label>
                        <select 
                            id="propietarioId" 
                            name="propietarioId" 
                            value={newPagoData.propietarioId} 
                            onChange={handleInputChange} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                            required
                        >
                            {initialPropietarios.map(p => (
                                <option key={p.id} value={p.id}>{p.nombre} ({p.apartamento})</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                           <label htmlFor="fecha" className="block text-sm font-medium text-slate-700 mb-1">Fecha de Pago</label>
                            <input type="date" id="fecha" name="fecha" value={newPagoData.fecha} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                        </div>
                        <div>
                            <label htmlFor="metodo" className="block text-sm font-medium text-slate-700 mb-1">Método de Pago</label>
                            <select id="metodo" name="metodo" value={newPagoData.metodo} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Pago Móvil">Pago Móvil</option>
                                <option value="Efectivo">Efectivo</option>
                            </select>
                        </div>
                    </div>
                     <div className="mb-4">
                        <label htmlFor="concepto" className="block text-sm font-medium text-slate-700 mb-1">Concepto</label>
                        <textarea id="concepto" name="concepto" value={newPagoData.concepto} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="monto" className="block text-sm font-medium text-slate-700 mb-1">Monto ($)</label>
                        <input type="number" id="monto" name="monto" value={newPagoData.monto} onChange={handleInputChange} min="0.01" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="Ej: 55.00" required />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                            Guardar Pago
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PagosView;
