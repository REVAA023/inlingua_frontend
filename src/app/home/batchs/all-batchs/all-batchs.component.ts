import { Component } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-all-batchs',
  imports: [
    InputControlComponent,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    PageLodingComponent,
    RouterModule,
    MatProgressBarModule,
  ],
  templateUrl: './all-batchs.component.html',
  styleUrl: './all-batchs.component.scss'
})
export class AllBatchsComponent {

  isLoading = false;
  allData: any[] = [];
  paginatedData: any[] = [];
  pageSize = 10;
  pageIndex = 0;

  // Filters
  searchText: string = '';
  filterDate: string = '';
  filterStatus: string = '';
  filterSource: string = '';

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    public data: DataService,
    private url: UrlService
  ) { }

  async ngOnInit() {
    await this.data.checkToken();
    this.getBatches();
  }

  selectedLeads: Set<number> = new Set();
  selectAllOnPage: boolean = false;

  toggleSelectAll(checked: boolean) {
    this.selectAllOnPage = checked;
    this.paginatedData.forEach(lead => {
      if (checked) {
        this.selectedLeads.add(lead.id);
      } else {
        this.selectedLeads.delete(lead.id);
      }
    });
  }

  toggleSelect(leadId: number, checked: boolean) {
    if (checked) {
      this.selectedLeads.add(leadId);
    } else {
      this.selectedLeads.delete(leadId);
      this.selectAllOnPage = false;
    }
  }

  isSelected(leadId: number): boolean {
    return this.selectedLeads.has(leadId);
  }

  selectedDelete(){
    console.log("Selecter Leads",this.selectedLeads)
  }

  getBatches() {
    this.apiService.getBatches().subscribe((response: any) => {
      this.allData = response.class || [];
      this.updatePaginatedData();
      console.log(response);
      this.isLoading = true;
    });
  }

  navigate(id: any) {
    this.url.encode(id).then((urlJson) => {
      this.router.navigateByUrl('batchs/details/' + urlJson);
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

  onFilterChange() {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

}
