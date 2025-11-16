
export type UserRole = 'Administrador' | 'Propietario' | 'Super Usuario';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export type View = 'dashboard' | 'propietarios' | 'gastos' | 'pagos' | 'reportes' | 'comunicaciones' | 'documentos' | 'reservas' | 'configuracion';

export type Permissions = {
  [key in View]: boolean;
};

export type Currency = 'USD' | 'VES';

export interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
}

export type TransactionType = 'Ingreso' | 'Egreso';

export interface Transaction {
  id: string;
  fecha: string;
  descripcion: string;
  tipo: TransactionType;
  monto: number;
  categoria: string;
}

export interface Documento {
  id: string;
  titulo: string;
  categoria: string;
  fechaSubida: string;
  url: string;
}

export interface CommonArea {
  id: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  status: 'Disponible' | 'Reservado';
}

export interface Propietario {
  id: string;
  nombre: string;
  apartamento: string;
  telefono: string;
  email: string;
  estado: 'Solvente' | 'Moroso';
}

export interface Pago {
  id: string;
  propietarioId: string;
  propietarioNombre: string;
  apartamento: string;
  fecha: string;
  monto: number;
  metodo: 'Transferencia' | 'Pago Móvil' | 'Efectivo';
  concepto: string;
}
