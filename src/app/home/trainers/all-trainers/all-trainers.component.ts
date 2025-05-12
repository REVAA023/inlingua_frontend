import { Component } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

@Component({
  selector: 'app-all-trainers',
  standalone: true,
  imports: [
    InputControlComponent,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    PageLodingComponent
  ],
  templateUrl: './all-trainers.component.html',
  styleUrl: './all-trainers.component.scss'
})
export class AllTrainersComponent {
  isLoading = false;
  trainers: any[] = [];
  paginatedData: any[] = [];
  pageSize = 10;
  pageIndex = 0;

  // Filters
  searchText: string = '';
  filterDate: string = '';

  constructor(
    private apiService: ApplicationApiService,
    public router: Router,
    public route: ActivatedRoute,
    private url: UrlService,
    public data: DataService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    this.getTrainers();
  }

  getTrainers() {
    this.apiService.getTrainers().subscribe((response: any) => {
      this.trainers = response.trainers || [];
      this.updatePaginatedData();
      console.log("Trainers", this.trainers);
      this.isLoading = true;
    });
  }

  navigate(id: any) {
    this.url.encode(id).then((urlJson) => {
      this.router.navigateByUrl('trainers/details/' + urlJson);
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
    return this.trainers.filter(trainer => {
      const matchesText = this.searchText
        ? (
          trainer.user?.fullName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          trainer.user?.email?.toLowerCase().includes(this.searchText.toLowerCase())
        )
        : true;

      const matchesDate = this.filterDate
        ? trainer.createdDate?.includes(this.filterDate)
        : true;

      return matchesText && matchesDate;
    });
  }

  onFilterChange() {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }
}
