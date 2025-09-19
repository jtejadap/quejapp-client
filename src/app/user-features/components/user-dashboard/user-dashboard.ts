import { Component, inject, OnInit } from '@angular/core';
import { PaginationControls } from '../../../components/pagination/pagination-controls/pagination-controls';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComplaintSearchRequest } from '../../../models/complaint-search-request';
import { ComplaintService } from '../../services/complaint-service';
import { PageResponse } from '../../../models/page-response';
import { Router } from '@angular/router';
import { NavigationBar } from '../../../components/navigation-bar/navigation-bar';

@Component({
  selector: 'app-user-dashboard',
  imports: [ReactiveFormsModule, PaginationControls, NavigationBar],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
  private complaintService = inject(ComplaintService);
  private router = inject(Router);
  page = 1;
  totalItems = 0; 
  pageSize = 5;
  complaints: any[] = [];
  loading = false;
  error: string | null = null;  
    
  // Sort
  sortBy = 'recievedDate';
  sortDir = 'desc';

  statusOptions= [
    { value: 0, label: 'All' },
    { value: 1, label: 'Abierto' },
    { value: 2, label: 'En Progreso' },
    { value: 3, label: 'Resuelto' },
    { value: 4, label: 'Cerrado' }
  ];

  // Search form
  searchForm = new FormGroup({    
    searchTerm: new FormControl(''),
    status: new FormControl(0)
  });

  ngOnInit(): void {
    this.loadData();       
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    console.log('New Page:', this.page);
    this.loadData();
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.loadData();
  }

  searchComplaints() {
    this.page = 1;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = null;
    let search:ComplaintSearchRequest = {
      searchTerm: this.searchForm.value.searchTerm || null,
      status: Number(this.searchForm.value.status)===0 ? null : (Number(this.searchForm.value.status)-1),
      page: (this.page - 1),
      size: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDir  
    }    
    
    this.complaintService.searchComplaints(search).subscribe({
      next: (response: PageResponse) => {
        this.complaints = response.content;
        this.totalItems = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading complaints: ' + error.message;
        this.loading = false;
        this.complaints = [];
      }
    });
    
  }

  viewComplaint(id: string) {
    this.router.navigate(['/user/complaints', id]);
  }
  
}
