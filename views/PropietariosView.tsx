
import React from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { initialPropietarios } from '../data/mockData';

const PropietariosView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Gestión de Propietarios</h1>
                    <p className="text-slate-500">Administra la información de contacto y el estado de cuenta de los residentes.</p>
                </div>
                <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Agregar Propietario</span>
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b bg-slate-50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-600">Nombre</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Apartamento</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Teléfono</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Email</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Estado</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialPropietarios.map((p, index) => (
                                <tr key={p.id} className={`border-b ${index === initialPropietarios.length - 1 ? 'border-none' : ''}`}>
                                    <td className="p-4 text-slate-800 font-medium">{p.nombre}</td>
                                    <td className="p-4 text-slate-500">{p.apartamento}</td>
                                    <td className="p-4 text-slate-500">{p.telefono}</td>
                                    <td className="p-4 text-slate-500">{p.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            p.estado === 'Solvente' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>{p.estado}</span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-primary-600 hover:text-primary-800 font-medium">
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PropietariosView;