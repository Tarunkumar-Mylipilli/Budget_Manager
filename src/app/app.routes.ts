import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/login/login.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];
