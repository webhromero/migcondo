
import React from 'react';
import { Currency } from '../types';
import { MenuIcon } from './icons/MenuIcon';

interface HeaderProps {
  onMenuClick: () => void;
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencySelector: React.FC<{currency: string, active?: boolean, onClick: () => void}> = ({currency, active, onClick}) => (
    <button onClick={onClick} className={`px-3 py-1 text-xs font-bold border rounded-md transition-colors ${active ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'}`}>
        {currency}
    </button>
);


const Header: React.FC<HeaderProps> = ({ onMenuClick, currentCurrency, setCurrency }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md"
              aria-label="Abrir menú"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
             <div className="md:hidden">
                <h1 className="text-xl font-bold text-primary-800">CondoPro</h1>
             </div>
          </div>
          <div className="flex items-center space-x-2">
            <CurrencySelector currency="USD" active={currentCurrency === 'USD'} onClick={() => setCurrency('USD')} />
            <CurrencySelector currency="VES" active={currentCurrency === 'VES'} onClick={() => setCurrency('VES')} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
