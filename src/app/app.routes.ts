import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-features/components/admin-dashboard/admin-dashboard';
import { UserDashboard } from './user-features/components/user-dashboard/user-dashboard';
import { Login } from './components/loginComponent/login';
import { Home } from './components/homeComponent/home';
import { AdminGuard } from './guards/admin-guard';
import { UserGuard } from './guards/user-guard';
import { Register } from './components/register-user/register/register';

export const routes: Routes = [
    { path: 'admin', component: AdminDashboard, canActivate: [AdminGuard] },
    { path: 'user', component: UserDashboard, canActivate: [UserGuard] },
    { path: 'register/:role', component: Register },
    { path: 'login', component: Login },
    { path: '', component: Home },
    { path: '**', component: Home }
];
