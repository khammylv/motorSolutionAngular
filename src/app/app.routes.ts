import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { DashboarComponent } from './pages/dashboar/dashboar.component';

export const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'admin', component: AdminComponent,
        children: [
            { path: 'user', component: UsersComponent },
            { path: 'clients', component: ClientsComponent },
            { path: 'vehicles', component: VehicleComponent },
            { path: 'home', component: DashboarComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
          ]

    },
    {path : 'home', component: EmployeeComponent},
    { path: '',   redirectTo: 'admin', pathMatch: 'full' },
];
