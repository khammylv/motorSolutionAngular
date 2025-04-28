import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EmployeeComponent } from './pages/employee/employee.component';

export const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'admin', component: AdminComponent},
    {path : 'home', component: EmployeeComponent},
    { path: '',   redirectTo: 'login', pathMatch: 'full' },
];
