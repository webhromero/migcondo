
import React from 'react';
import { FinanceIcon } from '../components/icons/FinanceIcon';
import { ResidentsIcon } from '../components/icons/ResidentsIcon';
import { DocumentIcon } from '../components/icons/DocumentIcon';
import { DownloadIcon } from '../components/icons/DownloadIcon';

interface ReportCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
        <div>
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            </div>
            <p className="text-slate-500 mb-6">{description}</p>
        </div>
        <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2 w-full justify-center">
            <DownloadIcon className="w-5 h-5"/>
            <span>Generar Reporte</span>
        </button>
    </div>
);


const ReportesView: React.FC = () => {

    const reports = [
        {
            id: '1',
            title: 'Informe Financiero Mensual',
            description: 'Un resumen detallado de todos los ingresos y egresos registrados durante el último mes. Incluye saldo inicial y final.',
            icon: <FinanceIcon className="w-6 h-6" />
        },
        {
            id: '2',
            title: 'Listado de Morosos',
            description: 'Genera una lista actualizada de todos los propietarios que presentan deudas pendientes con el condominio.',
            icon: <ResidentsIcon className="w-6 h-6" />
        },
        {
            id: '3',
            title: 'Historial de Pagos',
            description: 'Consulta el historial completo de pagos de un propietario específico. Ideal para aclaratorias y seguimiento.',
            icon: <DocumentIcon className="w-6 h-6" />
        },
        {
            id: '4',
            title: 'Relación de Gastos',
            description: 'Desglose de todos los gastos del condominio por categoría (mantenimiento, servicios, administración, etc.).',
            icon: <FinanceIcon className="w-6 h-6" />
        },
        {
            id: '5',
            title: 'Balance General Anual',
            description: 'Reporte consolidado del estado financiero del condominio para el año fiscal en curso.',
            icon: <DocumentIcon className="w-6 h-6" />
        },
        {
            id: '6',
            title: 'Directorio de Propietarios',
            description: 'Exporta un listado completo con la información de contacto de todos los propietarios registrados en el sistema.',
            icon: <ResidentsIcon className="w-6 h-6" />
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Generación de Reportes</h1>
                <p className="text-slate-500">Obtén informes detallados para una gestión transparente y eficiente.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <ReportCard 
                        key={report.id}
                        title={report.title}
                        description={report.description}
                        icon={report.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReportesView;