import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { DashboarComponent } from './pages/dashboar/dashboar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginCompanyComponent } from './pages/login-company/login-company.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { CompanyComponent } from './pages/company/company.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path : 'login', component: LoginComponent,
        children: [
            { path: 'user', component: LoginUserComponent },
            { path: 'company', component: LoginCompanyComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' }, // Ruta por defecto
          ]
    },
    {path : 'admin', component: AdminComponent,
        children: [
            { path: 'user', component: UsersComponent },
            { path: 'clients', component: ClientsComponent },
            { path: 'vehicles', component: VehicleComponent },
            { path: 'home', component: DashboarComponent },
            { path: 'profile', component: ProfileComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
          ]

    },
    {path : 'company', component: CompanyComponent},
    {path : 'home', component: HomeComponent},
    {path : 'dashboard', component: EmployeeComponent},
    { path: '',   redirectTo: 'login', pathMatch: 'full' },
];
