import React from 'react';
import { BuildingIcon } from '../components/icons/BuildingIcon';

interface PlaceholderViewProps {
  title: string;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center bg-white rounded-xl shadow-sm p-8">
      <div className="text-primary-300 mb-4">
        <BuildingIcon className="w-20 h-20" />
      </div>
      <h1 className="text-3xl font-bold text-slate-700 mb-2">{title}</h1>
      <p className="text-md text-slate-500">Esta sección está en construcción.</p>
      <p className="text-slate-500">Vuelve pronto para ver las nuevas funcionalidades.</p>
    </div>
  );
};

export default PlaceholderView;