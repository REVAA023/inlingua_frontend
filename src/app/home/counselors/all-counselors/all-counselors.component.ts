import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-all-counselors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
    InputControlComponent,
    PageLodingComponent
  ],
  templateUrl: './all-counselors.component.html',
  styleUrls: ['./all-counselors.component.scss']
})
export class AllCounselorsComponent implements OnInit {
  isLoading = false;
  errorTrue = false;

  allData: any[] = [];
  paginatedData: any[] = [];
  pageSize = 10;
  pageIndex = 0;

  // Filters
  searchText: string = '';
  filterDate: string = '';
  filterStatus: string = '';
  filterSource: string = '';
  counselor: any;


  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    public data: DataService,
    private url: UrlService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    this.getCounselors();
  }

  getCounselors(): void {
    this.apiService.getcounselor().subscribe((response: any) => {
      this.allData = response.counselors || [];
      this.updatePaginatedData();
      console.log("Counselors", this.allData);

      this.isLoading = true;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const filtered = this.getFilteredData();
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = filtered.slice(startIndex, endIndex);
  }

  getFilteredData(): any[] {
    return this.allData.filter(lead => {
      const matchesText = this.searchText
        ? (
          lead.leadName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          lead.leadEmail?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          lead.leadMobileNumber?.toLowerCase().includes(this.searchText.toLowerCase())
        )
        : true;

      const matchesDate = this.filterDate
        ? lead.createdDate?.includes(this.filterDate)
        : true;

      const matchesStatus = this.filterStatus
        ? lead.leadStatusLabel === this.filterStatus
        : true;

      const matchesSource = this.filterSource
        ? lead.source === this.filterSource
        : true;

      return matchesText && matchesDate && matchesStatus && matchesSource;
    });
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }
}
