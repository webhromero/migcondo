
import React, { useState, useMemo } from 'react';
import { Transaction, Currency } from '../types';
import { PlusIcon } from '../components/icons/PlusIcon';
import { initialTransactions } from '../data/mockData';
import Modal from '../components/Modal';

interface FinanzasViewProps {
    currentCurrency: Currency;
}

const StatCard: React.FC<{ title: string; value: string; className?: string }> = ({ title, value, className }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

const categories = [
    'Cuotas Ordinarias', 
    'Ingresos Extraordinarios', 
    'Mantenimiento', 
    'Servicios', 
    'Administración', 
    'Reparaciones',
    'Otros'
];

const categoryColors: { [key: string]: string } = {
    'Cuotas Ordinarias': 'bg-sky-100 text-sky-800',
    'Ingresos Extraordinarios': 'bg-amber-100 text-amber-800',
    'Mantenimiento': 'bg-blue-100 text-blue-800',
    'Servicios': 'bg-purple-100 text-purple-800',
    'Administración': 'bg-slate-100 text-slate-800',
    'Reparaciones': 'bg-orange-100 text-orange-800',
    'Otros': 'bg-gray-100 text-gray-800',
};

const FinanzasView: React.FC<FinanzasViewProps> = ({ currentCurrency }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
        fecha: new Date().toISOString().split('T')[0],
        descripcion: '',
        tipo: 'Egreso',
        monto: 0,
        categoria: 'Mantenimiento'
    });

    const USD_TO_VES_RATE = 300;

    const formatCurrency = (amount: number) => {
        const finalAmount = currentCurrency === 'VES' ? amount * USD_TO_VES_RATE : amount;
        const prefix = currentCurrency === 'VES' ? 'Bs.' : '$';
        const formattedAmount = finalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return `${prefix} ${formattedAmount}`;
    };

    const { totalIngresos, totalEgresos, saldoActual } = useMemo(() => {
        const ingresos = transactions.filter(t => t.tipo === 'Ingreso').reduce((sum, t) => sum + t.monto, 0);
        const egresos = transactions.filter(t => t.tipo === 'Egreso').reduce((sum, t) => sum + t.monto, 0);
        return {
            totalIngresos: ingresos,
            totalEgresos: egresos,
            saldoActual: ingresos - egresos
        };
    }, [transactions]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTransaction(prev => ({ ...prev, [name]: name === 'monto' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTransaction.descripcion && newTransaction.monto > 0) {
            const newTx: Transaction = {
                id: crypto.randomUUID(),
                ...newTransaction
            };
            setTransactions([newTx, ...transactions]);
            setIsModalOpen(false);
            setNewTransaction({
                fecha: new Date().toISOString().split('T')[0],
                descripcion: '',
                tipo: 'Egreso',
                monto: 0,
                categoria: 'Mantenimiento'
            });
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Administración Financiera</h1>
                    <p className="text-slate-500">Controla los ingresos, egresos y el balance del condominio.</p>
                </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Registrar Movimiento</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Ingresos del Mes" value={formatCurrency(totalIngresos)} className="text-green-600" />
                <StatCard title="Egresos del Mes" value={formatCurrency(totalEgresos)} className="text-red-600" />
                <StatCard title="Saldo Actual" value={formatCurrency(saldoActual)} className="text-slate-800" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Movimientos Recientes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b bg-slate-50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-600">Fecha</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Descripción</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Categoría</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Tipo</th>
                                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t, index) => (
                                <tr key={t.id} className={`border-b ${index === transactions.length - 1 ? 'border-none' : ''}`}>
                                    <td className="p-4 text-slate-500">{new Date(t.fecha).toLocaleDateString('es-ES')}</td>
                                    <td className="p-4 text-slate-800 font-medium">{t.descripcion}</td>
                                    <td className="p-4">
                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[t.categoria] || categoryColors['Otros']}`}>
                                            {t.categoria}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            t.tipo === 'Ingreso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>{t.tipo}</span>
                                    </td>
                                    <td className={`p-4 font-semibold text-right ${
                                        t.tipo === 'Ingreso' ? 'text-green-600' : 'text-red-600'
                                    }`}>{formatCurrency(t.monto)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Movimiento">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                           <label htmlFor="fecha" className="block text-sm font-medium text-slate-700 mb-1">Fecha</label>
                            <input type="date" id="fecha" name="fecha" value={newTransaction.fecha} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                        </div>
                         <div>
                            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                            <select id="tipo" name="tipo" value={newTransaction.tipo} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required>
                                <option value="Ingreso">Ingreso</option>
                                <option value="Egreso">Egreso</option>
                            </select>
                        </div>
                    </div>
                     <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                        <textarea id="descripcion" name="descripcion" value={newTransaction.descripcion} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="categoria" className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                            <select id="categoria" name="categoria" value={newTransaction.categoria} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="monto" className="block text-sm font-medium text-slate-700 mb-1">Monto ($)</label>
                            <input type="number" id="monto" name="monto" value={newTransaction.monto} onChange={handleInputChange} min="0.01" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                            Guardar Movimiento
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default FinanzasView;
