
import { Anuncio, Transaction, Documento, CommonArea, Propietario, Pago, User } from '../types';

export const mockUsers: User[] = [
    { id: '1', name: 'Super Admin', role: 'Super Usuario' },
    { id: '2', name: 'Admin Condominio', role: 'Administrador' },
    { id: '3', name: 'Juan Propietario', role: 'Propietario' }
];

export const initialAnuncios: Anuncio[] = [
    {
        id: '1',
        titulo: 'Mantenimiento Programado del Ascensor',
        contenido: 'Estimados residentes, les informamos que el ascensor principal estará fuera de servicio por mantenimiento el día viernes 25 de Octubre de 9:00 AM a 1:00 PM. Agradecemos su comprensión.',
        fecha: '2024-10-23'
    },
    {
        id: '2',
        titulo: 'Jornada de Fumigación en Áreas Comunes',
        contenido: 'Se realizará una jornada de fumigación en todas las áreas comunes el próximo lunes. Por favor, mantener ventanas cerradas y evitar el tránsito de mascotas durante la mañana.',
        fecha: '2024-10-21'
    }
];

export const initialTransactions: Transaction[] = [
    { id: '1', fecha: '2024-10-22', descripcion: 'Pago Cuota Condominio Apto. 5B', tipo: 'Ingreso', monto: 150.00, categoria: 'Cuotas Ordinarias' },
    { id: '2', fecha: '2024-10-21', descripcion: 'Servicio de Jardinería', tipo: 'Egreso', monto: 250.50, categoria: 'Mantenimiento' },
    { id: '3', fecha: '2024-10-20', descripcion: 'Pago Cuota Condominio Apto. 3A', tipo: 'Ingreso', monto: 150.00, categoria: 'Cuotas Ordinarias' },
    { id: '4', fecha: '2024-10-19', descripcion: 'Reparación bomba de agua', tipo: 'Egreso', monto: 475.00, categoria: 'Reparaciones' },
    { id: '5', fecha: '2024-10-18', descripcion: 'Alquiler Salón de Fiestas', tipo: 'Ingreso', monto: 100.00, categoria: 'Ingresos Extraordinarios' },
    { id: '6', fecha: '2024-10-17', descripcion: 'Pago servicio eléctrico áreas comunes', tipo: 'Egreso', monto: 320.00, categoria: 'Servicios' },
];

export const initialDocuments: Documento[] = [
    { id: '1', titulo: 'Reglamento de Condominio', categoria: 'Reglamentos', fechaSubida: '2023-01-15', url: '#' },
    { id: '2', titulo: 'Acta de Asamblea Ordinaria - Mayo 2024', categoria: 'Actas', fechaSubida: '2024-05-20', url: '#' },
    { id: '3', titulo: 'Normas de Uso de la Piscina', categoria: 'Normativas', fechaSubida: '2023-06-01', url: '#' },
    { id: '4', titulo: 'Presupuesto Anual 2024', categoria: 'Finanzas', fechaSubida: '2024-01-10', url: '#' },
];

export const initialAreas: CommonArea[] = [
    { id: '1', nombre: 'Salón de Fiestas', descripcion: 'Ideal para celebraciones y reuniones.', capacidad: 50, status: 'Disponible' },
    { id: '2', nombre: 'Área de Parrillera', descripcion: 'Equipada con todo lo necesario para un asado.', capacidad: 20, status: 'Reservado' },
    { id: '3', nombre: 'Cancha de Usos Múltiples', descripcion: 'Para practicar deportes como baloncesto y fútbol sala.', capacidad: 30, status: 'Disponible' },
];

export const initialPropietarios: Propietario[] = [
    { id: '1', nombre: 'Carlos Rodríguez', apartamento: 'Apto. 1A', telefono: '+58 412-1234567', email: 'carlos.r@email.com', estado: 'Solvente' },
    { id: '2', nombre: 'Ana Martínez', apartamento: 'Apto. 1B', telefono: '+58 414-2345678', email: 'ana.m@email.com', estado: 'Solvente' },
    { id: '3', nombre: 'Luis González', apartamento: 'Apto. 2A', telefono: '+58 416-3456789', email: 'luis.g@email.com', estado: 'Moroso' },
    { id: '4', nombre: 'María Hernández', apartamento: 'Apto. 2B', telefono: '+58 424-4567890', email: 'maria.h@email.com', estado: 'Solvente' },
    { id: '5', nombre: 'José Pérez', apartamento: 'Apto. 3A', telefono: '+58 412-5678901', email: 'jose.p@email.com', estado: 'Solvente' },
    { id: '6', nombre: 'Laura Sánchez', apartamento: 'Apto. 3B', telefono: '+58 414-6789012', email: 'laura.s@email.com', estado: 'Solvente' },
    { id: '7', nombre: 'Pedro Ramírez', apartamento: 'Apto. 4A', telefono: '+58 416-7890123', email: 'pedro.r@email.com', estado: 'Moroso' },
    { id: '8', nombre: 'Sofía Torres', apartamento: 'Apto. 4B', telefono: '+58 424-8901234', email: 'sofia.t@email.com', estado: 'Solvente' },
    { id: '9', nombre: 'Andrés Gómez', apartamento: 'Apto. 5A', telefono: '+58 412-9012345', email: 'andres.g@email.com', estado: 'Solvente' },
    { id: '10', nombre: 'Isabella Díaz', apartamento: 'Apto. 5B', telefono: '+58 414-0123456', email: 'isabella.d@email.com', estado: 'Solvente' },
];

export const initialPagos: Pago[] = [
    { id: '1', propietarioId: '1', propietarioNombre: 'Carlos Rodríguez', apartamento: 'Apto. 1A', fecha: '2024-10-25', monto: 55.00, metodo: 'Transferencia', concepto: 'Cuota Condominio Octubre' },
    { id: '2', propietarioId: '2', propietarioNombre: 'Ana Martínez', apartamento: 'Apto. 1B', fecha: '2024-10-25', monto: 55.00, metodo: 'Pago Móvil', concepto: 'Cuota Condominio Octubre' },
    { id: '3', propietarioId: '4', propietarioNombre: 'María Hernández', apartamento: 'Apto. 2B', fecha: '2024-10-24', monto: 110.00, metodo: 'Transferencia', concepto: 'Cuotas Septiembre y Octubre' },
    { id: '4', propietarioId: '5', propietarioNombre: 'José Pérez', apartamento: 'Apto. 3A', fecha: '2024-10-23', monto: 55.00, metodo: 'Efectivo', concepto: 'Cuota Condominio Octubre' },
    { id: '5', propietarioId: '6', propietarioNombre: 'Laura Sánchez', apartamento: 'Apto. 3B', fecha: '2024-10-22', monto: 55.00, metodo: 'Pago Móvil', concepto: 'Cuota Condominio Octubre' },
    { id: '6', propietarioId: '8', propietarioNombre: 'Sofía Torres', apartamento: 'Apto. 4B', fecha: '2024-10-21', monto: 55.00, metodo: 'Transferencia', concepto: 'Cuota Condominio Octubre' },
    { id: '7', propietarioId: '9', propietarioNombre: 'Andrés Gómez', apartamento: 'Apto. 5A', fecha: '2024-10-20', monto: 15.00, metodo: 'Pago Móvil', concepto: 'Fondo de reserva' },
];
