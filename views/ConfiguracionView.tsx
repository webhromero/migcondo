
import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';
import { InfoIcon } from '../components/icons/InfoIcon';
import { FinanceIcon } from '../components/icons/FinanceIcon';
import { BellIcon } from '../components/icons/BellIcon';
import { ResidentsIcon } from '../components/icons/ResidentsIcon';
import { PlusIcon } from '../components/icons/PlusIcon';

const SettingCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        </div>
        <div>{children}</div>
    </div>
);

const InputField: React.FC<{ label: string; id: string; type?: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, id, type = 'text', value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
    </div>
);

const ToggleSwitch: React.FC<{ label: string; id: string; enabled: boolean; setEnabled: (enabled: boolean) => void }> = ({ label, id, enabled, setEnabled }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0">
        <span className="text-slate-600">{label}</span>
        <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`${enabled ? 'bg-primary-600' : 'bg-slate-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            role="switch"
            aria-checked={enabled}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
        </button>
    </div>
);

const ConfiguracionView: React.FC = () => {
    const [condoInfo, setCondoInfo] = useState({
        nombre: 'Condominio Residencias del Parque',
        direccion: 'Av. Principal, Urb. El Bosque, Caracas',
        rif: 'J-12345678-9',
        telefono: '+58 212-555-1234',
    });

    const [financeSettings, setFinanceSettings] = useState({
        cuota: 55,
        diaVencimiento: 5,
        tasaCambio: 300,
    });
    
    const [notifications, setNotifications] = useState({
        anuncios: true,
        pagos: true,
        reservas: false,
    });

    const handleCondoInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCondoInfo({ ...condoInfo, [e.target.name]: e.target.value });
    };

    const handleFinanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinanceSettings({ ...financeSettings, [e.target.name]: parseFloat(e.target.value) });
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Configuración del Sistema</h1>
                <p className="text-slate-500">Administra los parámetros generales del condominio y la aplicación.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <SettingCard title="Información del Condominio" icon={<InfoIcon className="w-6 h-6" />}>
                        <form className="space-y-4">
                            <InputField label="Nombre del Condominio" id="nombre" value={condoInfo.nombre} onChange={handleCondoInfoChange} />
                            <InputField label="Dirección Fiscal" id="direccion" value={condoInfo.direccion} onChange={handleCondoInfoChange} />
                            <InputField label="RIF" id="rif" value={condoInfo.rif} onChange={handleCondoInfoChange} />
                            <InputField label="Teléfono de Contacto" id="telefono" value={condoInfo.telefono} onChange={handleCondoInfoChange} />
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors">Guardar Cambios</button>
                            </div>
                        </form>
                    </SettingCard>
                    <SettingCard title="Configuración de Notificaciones" icon={<BellIcon className="w-6 h-6" />}>
                        <div className="space-y-2">
                            <ToggleSwitch label="Notificar nuevos anuncios" id="anuncios" enabled={notifications.anuncios} setEnabled={(val) => setNotifications(p => ({...p, anuncios: val}))} />
                            <ToggleSwitch label="Enviar recordatorios de pago" id="pagos" enabled={notifications.pagos} setEnabled={(val) => setNotifications(p => ({...p, pagos: val}))} />
                            <ToggleSwitch label="Confirmar reservas por email" id="reservas" enabled={notifications.reservas} setEnabled={(val) => setNotifications(p => ({...p, reservas: val}))} />
                        </div>
                         <div className="flex justify-end pt-6">
                            <button type="button" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors">Guardar Preferencias</button>
                        </div>
                    </SettingCard>
                </div>
                <div className="space-y-8">
                    <SettingCard title="Parámetros Financieros" icon={<FinanceIcon className="w-6 h-6" />}>
                        <form className="space-y-4">
                            <InputField label="Monto Cuota Mensual ($)" id="cuota" type="number" value={financeSettings.cuota} onChange={handleFinanceChange} />
                            <InputField label="Día de Vencimiento de la Cuota" id="diaVencimiento" type="number" value={financeSettings.diaVencimiento} onChange={handleFinanceChange} />
                            <InputField label="Tasa de Cambio (VES por $)" id="tasaCambio" type="number" value={financeSettings.tasaCambio} onChange={handleFinanceChange} />
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors">Guardar Cambios</button>
                            </div>
                        </form>
                    </SettingCard>
                    <SettingCard title="Gestión de Usuarios" icon={<ResidentsIcon className="w-6 h-6" />}>
                        <ul className="divide-y divide-slate-200 mb-4">
                            {mockUsers.map(user => (
                                <li key={user.id} className="py-3 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-800">{user.name}</p>
                                        <p className="text-sm text-slate-500">{user.role}</p>
                                    </div>
                                    <button className="text-primary-600 hover:text-primary-800 font-medium text-sm">Editar</button>
                                </li>
                            ))}
                        </ul>
                         <div className="flex justify-end pt-2">
                            <button type="button" className="bg-primary-100 text-primary-700 font-bold py-2 px-4 rounded-lg hover:bg-primary-200 transition-colors flex items-center gap-2">
                                <PlusIcon className="w-5 h-5"/>
                                <span>Agregar Usuario</span>
                            </button>
                        </div>
                    </SettingCard>
                </div>
            </div>
        </div>
    );
};

export default ConfiguracionView;
