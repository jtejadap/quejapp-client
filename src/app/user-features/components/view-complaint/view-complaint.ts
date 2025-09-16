import { Component, inject, signal } from '@angular/core';
import { ComplaintService } from '../../services/complaint-service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view-complaint',
  imports: [],
  templateUrl: './view-complaint.html',
  styleUrl: './view-complaint.css'
})
export class ViewComplaint {
  private complaintService = inject(ComplaintService);
  private activatedRoute = inject(ActivatedRoute);
  complaintId = signal<string | null>(null);
  complaint:any = null;

  loading = false;
  error: string | null = null;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.setUpComplaintId(params);
      this.setUpView();     
    });
  }

  setUpComplaintId(params:Params){
    if (this.checkIfParamHasValue(params,'id')) {
      this.complaintId.set(params['id']);
      return;
    } 
    
    this.complaintId.set(null);
    return;
  }

  checkIfParamHasValue(params:any, key:string): boolean {
    return params[key] !== undefined && params[key] !== null && params[key] !== '';
  }

  setUpView() {
    if (this.complaintId()) {
      this.loadComplaint(this.complaintId()!);
    } else {
      this.error = 'Invalid complaint ID';
      this.complaint = null;
      this.loading = false;    
    }
  }

  public loadComplaint(id: string) {
    this.loading = true;
    this.error = null;
    this.complaintService.getComplaint(id).subscribe({
      next: (response) => {
        this.complaint = response; 
        console.log(this.complaint);      
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading complaint: ' + error.message;
        this.loading = false;
        this.complaint = null;
      }
    });
  }

}
