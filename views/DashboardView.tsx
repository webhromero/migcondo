
import React from 'react';
import { IncomeIcon } from '../components/icons/IncomeIcon';
import { ExpenseIcon } from '../components/icons/ExpenseIcon';
import { ReceivableIcon } from '../components/icons/ReceivableIcon';
import { OwnersIcon } from '../components/icons/OwnersIcon';
import IncomeExpenseChart from '../components/charts/IncomeExpenseChart';
import PaymentStatusChart from '../components/charts/PaymentStatusChart';
import { initialTransactions, initialPropietarios } from '../data/mockData';
import { Currency } from '../types';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface DashboardViewProps {
  currentCurrency: Currency;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor} mr-4`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ currentCurrency }) => {
  const USD_TO_VES_RATE = 300;

  const formatCurrency = (amount: number) => {
    const finalAmount = currentCurrency === 'VES' ? amount * USD_TO_VES_RATE : amount;
    const prefix = currentCurrency === 'VES' ? 'Bs.' : '$';
    const formattedAmount = finalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${prefix} ${formattedAmount}`;
  };

  const totalIngresos = initialTransactions.filter(t => t.tipo === 'Ingreso').reduce((sum, t) => sum + t.monto, 0);
  const totalEgresos = initialTransactions.filter(t => t.tipo === 'Egreso').reduce((sum, t) => sum + t.monto, 0);
  
  const morososCount = initialPropietarios.filter(p => p.estado === 'Moroso').length;
  const solventesCount = initialPropietarios.filter(p => p.estado === 'Solvente').length;
  const cuentasPorCobrar = morososCount * 55; // Asumiendo una cuota de $55 por propietario moroso
  
  const totalPropietarios = initialPropietarios.length;

  const paymentStatusData = [solventesCount, 0, morososCount]; // [Al día, Parcial, Vencido]
  
  const reserveFundCurrent = 35600;
  const reserveFundGoal = 50000;
  const reserveFundPercentage = (reserveFundCurrent / reserveFundGoal) * 100;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
        <p className="text-slate-500">Resumen general del condominio</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Ingresos del Mes" 
          value={formatCurrency(totalIngresos)} 
          icon={<IncomeIcon className="w-6 h-6 text-green-600" />}
          iconBgColor="bg-green-100"
        />
        <StatCard 
          title="Gastos del Mes" 
          value={formatCurrency(totalEgresos)} 
          icon={<ExpenseIcon className="w-6 h-6 text-red-600" />}
          iconBgColor="bg-red-100"
        />
        <StatCard 
          title="Cuentas por Cobrar" 
          value={formatCurrency(cuentasPorCobrar)} 
          icon={<ReceivableIcon className="w-6 h-6 text-amber-600" />}
          iconBgColor="bg-amber-100"
        />
        <StatCard 
          title="Total Propietarios" 
          value={totalPropietarios.toString()} 
          icon={<OwnersIcon className="w-6 h-6 text-blue-600" />}
          iconBgColor="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Ingresos vs Gastos</h2>
          <div className="h-72">
            <IncomeExpenseChart />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Estado de Pagos</h2>
           <div className="h-72 flex items-center justify-center">
            <PaymentStatusChart data={paymentStatusData} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Fondos de Reserva</h2>
        <div className="w-full bg-slate-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-4 rounded-full" style={{width: `${reserveFundPercentage}%`}}></div>
        </div>
        <p className="text-right mt-2 text-slate-600 font-semibold">{formatCurrency(reserveFundCurrent)} / {formatCurrency(reserveFundGoal)}</p>
      </div>
    </div>
  );
};

export default DashboardView;
