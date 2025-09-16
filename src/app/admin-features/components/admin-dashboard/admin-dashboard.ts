import { Component, inject } from '@angular/core';
import { ManageService } from '../../services/manage-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationControls } from '../../../components/pagination/pagination-controls/pagination-controls';
import { ComplaintSearchRequest } from '../../../models/complaint-search-request';
import { PageResponse } from '../../../models/page-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ReactiveFormsModule, PaginationControls],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  private manageService = inject(ManageService);
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
    
    this.manageService.searchComplaints(search).subscribe({
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
    this.router.navigate(['/admin/complaints', id]);
  }
}
