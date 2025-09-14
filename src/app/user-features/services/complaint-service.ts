import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreatedComplaint } from '../../models/created-complaint';
import { ComplaintRequest } from '../../models/complaint-request';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = '/api/user';
  private http = inject(HttpClient);

  public createComplaint(complaint: ComplaintRequest) {
    return this.http.post<CreatedComplaint>(`${this.apiUrl}/complaint`, complaint);
  }
}
