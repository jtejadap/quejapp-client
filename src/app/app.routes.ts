import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-features/components/admin-dashboard/admin-dashboard';
import { UserDashboard } from './user-features/components/user-dashboard/user-dashboard';
import { Login } from './components/loginComponent/login';
import { Home } from './components/homeComponent/home';
import { AdminGuard } from './guards/admin-guard';
import { UserGuard } from './guards/user-guard';
import { Register } from './components/register-user/register/register';
import { CreateComplaint } from './user-features/components/create-complaint/create-complaint';

export const routes: Routes = [
    { path: 'admin', component: AdminDashboard, canActivate: [AdminGuard] },
    { path: 'user', component: UserDashboard, canActivate: [UserGuard] },
    { path: 'user/complaint', component: CreateComplaint, canActivate: [UserGuard] },
    { path: 'register/:role', component: Register },
    { path: 'login', component: Login },
    { path: '', component: Home },
    { path: '**', component: Home }
];
