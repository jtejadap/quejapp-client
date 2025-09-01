import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token);
        })
      );
  }  

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getUserdata(): User | null {
    let userStringfy = localStorage.getItem('userdata')||'{}';
    let user:User = JSON.parse(userStringfy);    
    if (Object.keys(user).length === 0) {
      return null;
    }
    return user;
  }

  getTokenExpiration(): Date | null {    
    return this.getUserdata()?.expDate || null;
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
   
    if (!expiration){
       console.log(expiration);
      return true;
    }  // no token or invalid
    return expiration.getTime() < Date.now();
  }

  getUserRoles(): string[] {
    return this.getUserdata()?.roles || [];
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ROLE_ADMIN');
  }

  isUser(): boolean {
    return this.getUserRoles().includes('ROLE_USER');
  }  


  logout(): void {
    localStorage.removeItem('jwt');
  }  
}
