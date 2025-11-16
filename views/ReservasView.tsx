import React from 'react';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { initialAreas } from '../data/mockData';

const ReservasView: React.FC = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Reserva de Áreas Comunes</h1>
                <p className="text-slate-500">Gestiona la disponibilidad y las solicitudes de reserva de los espacios compartidos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialAreas.map(area => (
                    <div key={area.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold text-slate-800">{area.nombre}</h2>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    area.status === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                }`}>{area.status}</span>
                            </div>
                            <p className="text-slate-500 mt-2 mb-4">{area.descripcion}</p>
                            <p className="text-sm text-slate-600 font-medium">Capacidad: {area.capacidad} personas</p>
                        </div>
                        <div className="mt-6">
                             <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2 w-full justify-center">
                                <CalendarIcon className="w-5 h-5"/>
                                <span>Ver Calendario y Reservar</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservasView;