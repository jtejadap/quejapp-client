import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComplaintSearchRequest } from '../../models/complaint-search-request';
import { PageResponse } from '../../models/page-response';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  private apiUrl = '/api/admin';
  private http = inject(HttpClient);
  
  public searchComplaints(request: ComplaintSearchRequest) {
    return this.http.post<PageResponse>(`${this.apiUrl}/complaints`, request);
  }
}
