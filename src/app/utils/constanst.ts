import { MenuItem } from 'app/models/menuItem.model';
import { TblItem } from 'app/models/TblItem.model';

export const MENU_ITEMS: MenuItem[] = [
  { name: 'Inicio', icon: 'home', route: '/admin/home' },
  { name: 'Empleados', icon: 'supervisor_account', route: '/admin/user' },
  { name: 'Clientes', icon: 'group', route: '/admin/clients' },
  { name: 'Vehículos', icon: 'time_to_leave', route: '/admin/vehicles' },
  { name: 'Reparaciones', icon: 'handyman', route: '/admin/repair' },
  { name: 'Facturas', icon: 'request_quote', route: '/admin/billing' },
];
export const MENU_ITEMS_EMPLEADO: MenuItem[] = [
  { name: 'Inicio', icon: 'home', route: '/user/home' },
  { name: 'Clientes', icon: 'group', route: '/user/clients' },
  { name: 'Vehículos', icon: 'time_to_leave', route: '/user/vehicles' },
  { name: 'Reparaciones', icon: 'handyman', route: '/user/repair' },
  { name: 'Facturas', icon: 'request_quote', route: '/user/billing' },
];

export const PROFILE_USER: TblItem[] = [
  { name: 'Ususario' },
  { name: 'Email' },
  { name: 'Identificación' },
  { name: 'Role' },
];

export const PROFILE_COMPANY: TblItem[] = [
  { name: 'Nombre' },
  { name: 'Nit' },
  { name: 'Direccion' },
  { name: 'Telefono' },
  { name: 'Email' },
  { name: 'Representante Legal' },
];

export const TBL_USER: TblItem[] = [
  { name: 'Ususario' },
  { name: 'Email' },
  { name: 'Identificación' },
  { name: 'Role' },
  { name: 'Action' },
];
export const TBL_CLIENT: TblItem[] = [
  { name: 'Nombre' },
  { name: 'Email' },
  { name: 'Identificación' },
  { name: 'Telefono' },
  { name: 'Action' },
];
export const TBL_VEHICLE: TblItem[] = [
  { name: 'Nombre cliente' },
  { name: 'Marca' },
  { name: 'Modelo' },
  { name: 'Placa' },
  { name: 'Action' },
];
export const TBL_REPAIRS: TblItem[] = [
  { name: 'Nombre cliente' },
  { name: 'Fecha de entrada' },
  { name: 'Fecha de salida' },
  { name: 'Modelo' },
  { name: 'Placa' },
  { name: 'Status' },
  { name: 'Action' },
];
export const TBL_REPAIRS_DETAILS: TblItem[] = [
  { name: 'Servicio' },
  { name: 'Descripción' },
  { name: 'Precio' },
  { name: 'Action' },
];
export const SUCCES_CLASS = 'mdc-snackbar--success';
export const ERROR_CLASS = 'mdc-snackbar--error';
export const WARNING_CLASS = 'mdc-snackbar--warning';
export const INFO_CLASS = 'mdc-snackbar--info';
