
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Currency, User, Permissions } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AnunciosView from './views/AnunciosView';
import FinanzasView from './views/FinanzasView';
import PropietariosView from './views/PropietariosView';
import PagosView from './views/PagosView';
import ReportesView from './views/ReportesView';
import DocumentosView from './views/DocumentosView';
import ReservasView from './views/ReservasView';
import ConfiguracionView from './views/ConfiguracionView';
import { mockUsers } from './data/mockData';

const ROLES: Record<User['role'], Permissions> = {
  'Super Usuario': {
    dashboard: true,
    comunicaciones: true,
    propietarios: true,
    gastos: true,
    pagos: true,
    reportes: true,
    documentos: true,
    reservas: true,
    configuracion: true,
  },
  'Administrador': {
    dashboard: true,
    comunicaciones: true,
    propietarios: true,
    gastos: true,
    pagos: true,
    reportes: true,
    documentos: true,
    reservas: true,
    configuracion: false,
  },
  'Propietario': {
    dashboard: true,
    comunicaciones: true,
    propietarios: false,
    gastos: false,
    pagos: false,
    reportes: false,
    documentos: true,
    reservas: true,
    configuracion: false,
  },
};


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);

  const userPermissions = useMemo(() => ROLES[currentUser.role], [currentUser.role]);

  useEffect(() => {
    // Si el usuario ya no tiene permiso para la vista actual, redirigir al dashboard
    if (!userPermissions[currentView]) {
      setCurrentView('dashboard');
    }
  }, [currentUser, currentView, userPermissions]);

  const handleSetView = useCallback((view: View) => {
    if (userPermissions[view]) {
        setCurrentView(view);
    }
    setIsSidebarOpen(false); 
  }, [userPermissions]);

  const handleSetCurrency = useCallback((currency: Currency) => {
    setCurrentCurrency(currency);
  }, []);
  
  const handleSetUser = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const renderView = () => {
    if (!userPermissions[currentView]) {
      return <DashboardView currentCurrency={currentCurrency} />;
    }
    switch (currentView) {
      case 'dashboard':
        return <DashboardView currentCurrency={currentCurrency} />;
      case 'propietarios':
        return <PropietariosView />;
      case 'gastos':
        return <FinanzasView currentCurrency={currentCurrency} />;
      case 'pagos':
        return <PagosView currentCurrency={currentCurrency} />;
      case 'reportes':
        return <ReportesView />;
      case 'comunicaciones':
        return <AnunciosView />;
      case 'documentos':
        return <DocumentosView />;
      case 'reservas':
        return <ReservasView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <DashboardView currentCurrency={currentCurrency} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-800 md:flex">
      <Sidebar
        currentView={currentView}
        setView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
        permissions={userPermissions}
        allUsers={mockUsers}
        setCurrentUser={handleSetUser}
      />
      <div className="flex-1 flex flex-col min-w-0">
          <Header 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            currentCurrency={currentCurrency}
            setCurrency={handleSetCurrency}
          />
          <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
            {renderView()}
          </main>
      </div>
    </div>
  );
};

export default App;
