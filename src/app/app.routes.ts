import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-features/components/admin-dashboard/admin-dashboard';
import { UserDashboard } from './user-features/components/user-dashboard/user-dashboard';
import { RoleGuard } from './guards/role-guard';
import { Login } from './components/loginComponent/login';
import { Home } from './components/homeComponent/home';

export const routes: Routes = [
    { path: 'admin', component: AdminDashboard, canActivate: [RoleGuard] },
    { path: 'user', component: UserDashboard, canActivate: [RoleGuard] },
    { path: 'login', component: Login },
    { path: '', component: Home }

];
