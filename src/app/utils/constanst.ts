import { MenuItem } from "../models/menuItem.model";
import { TblItem } from "../models/TblItem.model";

export const   MENU_ITEMS: MenuItem[] = [
    { name: 'Inicio', icon: 'home', route: '/admin/home' },
    { name: 'Empleados', icon: 'supervisor_account', route: '/admin/user' },
    { name: 'Clientes', icon: 'group', route: '/admin/clients' },
    { name: 'Vehículos', icon: 'time_to_leave', route: '/admin/vehicles' }
  ];

export const PROFILE_USER: TblItem[] = [
        { name: 'Ususario'},
        { name: 'Email'},
        { name: 'Identificación'},
        { name: 'Role'},
       
 ];

 export const PROFILE_COMPANY: TblItem[] = [
  { name: 'Nombre'},
  { name: 'Nit'},
  { name: 'Direccion'},
  { name: 'Telefono'},
  { name: 'Email'},
  { name: 'Representante Legal'}
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
export const SUCCES_CLASS = 'mdc-snackbar--success';
export const ERROR_CLASS = 'mdc-snackbar--error';
export const WARNING_CLASS = 'mdc-snackbar--warning';
export const INFO_CLASS = 'mdc-snackbar--info';