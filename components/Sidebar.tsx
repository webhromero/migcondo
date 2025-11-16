
import React, { useRef } from 'react';
import { View, User, Permissions } from '../types';
import { DashboardIcon } from './icons/DashboardIcon';
import { AnnouncementsIcon } from './icons/AnnouncementsIcon';
import { ResidentsIcon } from './icons/ResidentsIcon';
import { FinanceIcon } from './icons/FinanceIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { CloseIcon } from './icons/CloseIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ReceivableIcon } from './icons/ReceivableIcon';
import { UserIcon } from './icons/UserIcon';
import { SwitchUserIcon } from './icons/SwitchUserIcon';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: User;
  permissions: Permissions;
  allUsers: User[];
  setCurrentUser: (user: User) => void;
}

const NavItem: React.FC<{
  view: View;
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
  label: string;
}> = ({ view, currentView, setView, children, label }) => {
  const isActive = currentView === view;
  return (
    <div>
      <button
        onClick={() => setView(view)}
        className={`flex items-center p-3 my-1 w-full text-left rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-primary-600 text-white shadow-lg'
            : 'text-slate-100 hover:bg-primary-700/50'
        }`}
      >
        <div className="w-6 h-6 mr-3">{children}</div>
        <span className="font-medium">{label}</span>
      </button>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen, currentUser, permissions, allUsers, setCurrentUser }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;
    const selectedUser = allUsers.find(user => user.id === selectedUserId);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-primary-800 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary-700/50">
          <div className="flex items-center gap-2">
            <BuildingIcon className="w-8 h-8 text-primary-300"/>
            <h1 className="text-xl font-bold text-white">CondoPro</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-primary-300 hover:text-white">
            <CloseIcon className="w-6 h-6"/>
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div>
            {permissions.dashboard && <NavItem view="dashboard" currentView={currentView} setView={setView} label="Panel de Control"><DashboardIcon /></NavItem>}
            {permissions.comunicaciones && <NavItem view="comunicaciones" currentView={currentView} setView={setView} label="Cartelera"><AnnouncementsIcon /></NavItem>}
            {permissions.propietarios && <NavItem view="propietarios" currentView={currentView} setView={setView} label="Propietarios"><ResidentsIcon /></NavItem>}
            {permissions.gastos && <NavItem view="gastos" currentView={currentView} setView={setView} label="Gastos"><FinanceIcon /></NavItem>}
            {permissions.pagos && <NavItem view="pagos" currentView={currentView} setView={setView} label="Pagos"><ReceivableIcon/></NavItem>}
            {permissions.reportes && <NavItem view="reportes" currentView={currentView} setView={setView} label="Reportes"><DocumentIcon /></NavItem>}
            {permissions.documentos && <NavItem view="documentos" currentView={currentView} setView={setView} label="Documentos"><DocumentIcon /></NavItem>}
            {permissions.reservas && <NavItem view="reservas" currentView={currentView} setView={setView} label="Áreas Comunes"><CalendarIcon /></NavItem>}
          </div>
        </nav>
        <div className="px-4 py-4 border-t border-primary-700/50">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center ring-2 ring-primary-500">
                    <UserIcon className="w-6 h-6 text-primary-200"/>
                </div>
                <div>
                    <p className="font-semibold text-white text-sm">{currentUser.name}</p>
                    <p className="text-xs text-primary-300">{currentUser.role}</p>
                </div>
            </div>
            <div className="relative">
                <SwitchUserIcon className="w-5 h-5 text-primary-300 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none" />
                <select 
                    value={currentUser.id}
                    onChange={handleUserChange}
                    className="w-full bg-primary-700 border border-primary-600 rounded-md text-white text-sm py-2 pl-10 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Cambiar usuario"
                >
                    {allUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="px-2 py-2 border-t border-primary-700/50">
            <div>
                {permissions.configuracion && <NavItem view="configuracion" currentView={currentView} setView={setView} label="Configuración"><SettingsIcon /></NavItem>}
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
