import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  imports: [],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css'
})
export class NavigationBar {
  private authService = inject(AuthService);
  private router = inject(Router);
  isAuthenticated = this.authService.isAuthenticated();
  isAdmin = this.authService.isAdmin();
  isUser = this.authService.isUser();
  navItems: any[] = [];
  userNavItems = [
    { name: 'Mis Radicados', href: '/user', current: true },
    { name: 'Nuevo', href: '/user/complaint', current: false },   
  ];

  adminNavItems = [
    { name: 'Dashboard', href: '/admin', current: true },
    { name: 'Radicados', href: '/admin/complaints', current: false } 
  ];

  guestNavItems = [
    { name: 'Inicio', href: '/', current: false },
    { name: 'Ingresar', href: '/login', current: false },
    { name: 'Registrarse', href: '/register/user', current: false }   
  ];


  constructor() {  
    this.checkAuth();
    this.setNavItems();
  }
  
  checkAuth() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }
  setNavItems() {
    if (this.isAdmin) {
      this.navItems = this.adminNavItems;
    } else if (this.isUser) {
      this.navItems = this.userNavItems;
    } else {
      this.navItems = this.guestNavItems;
    }
  }

  getUserName(): string {
    const user = this.authService.getUserdata();
    return user ? user.name : 'Guest';
  }

  logout(): void {
    this.authService.logout();    
    this.checkAuth();
    this.setNavItems();
    this.router.navigate(['/']);
  }  

  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  setActive(item: any): void {
    this.navItems.forEach(nav => nav.current = false);
    item.current = true;
  }

}
