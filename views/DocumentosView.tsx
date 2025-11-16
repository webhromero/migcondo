import React from 'react';
import { UploadIcon } from '../components/icons/UploadIcon';
import { DownloadIcon } from '../components/icons/DownloadIcon';
import { DocumentIcon } from '../components/icons/DocumentIcon';
import { initialDocuments } from '../data/mockData';

const DocumentosView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Gestión de Documentos</h1>
                    <p className="text-slate-500">Mantén todos los documentos importantes organizados y accesibles.</p>
                </div>
                <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <UploadIcon className="w-5 h-5"/>
                    <span>Subir Documento</span>
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-slate-200">
                    {initialDocuments.map(doc => (
                        <li key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                                    <DocumentIcon className="w-6 h-6"/>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">{doc.titulo}</p>
                                    <p className="text-sm text-slate-500">{doc.categoria} <span className="mx-2 text-slate-300">|</span> Subido el {new Date(doc.fechaSubida).toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>
                            <button className="text-primary-600 hover:text-primary-800 font-medium py-2 px-3 rounded-lg border border-primary-200 hover:bg-primary-50 flex items-center gap-2 transition-colors">
                                <DownloadIcon className="w-5 h-5"/>
                                <span>Descargar</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DocumentosView;