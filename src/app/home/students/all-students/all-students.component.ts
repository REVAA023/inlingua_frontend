import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-students',
  imports: [
    InputControlComponent,
    PageLodingComponent,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent {
  allStudents: any = { students: [] };
  paginatedStudents: any[] = [];
  pageSize = 10;
  pageIndex = 0;

  // Filters
  searchText: string = '';
  filterDate: string = '';

  isLoading: boolean = false;

  constructor(
    public data: DataService,
    private apiService: ApplicationApiService,
    private router: Router,
    private url: UrlService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    this.getAllStudentDetails()
  }

  selectStudent(){
    console.log("Selected Student");
  }

  getAllStudentDetails() {
    this.isLoading = false;
    this.apiService.getAllStudentDetails().subscribe((response: any) => {
      this.allStudents = response;
      this.updatePaginatedData();
      this.isLoading = true;
    });
  }

  async navigate(id: any) {
    let urlJson = await this.url.encode(id);
    this.router.navigateByUrl("students/details/" + urlJson)
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
    this.paginatedStudents = filtered.slice(startIndex, endIndex);
  }

  getFilteredData(): any[] {
    return this.allStudents.students.filter((student: any) => {
      const matchesText = this.searchText
        ? (
          student.user.firstName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.user.lastName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.user.email?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.user.mobileNumber?.toLowerCase().includes(this.searchText.toLowerCase())
        )
        : true;
      const matchesDate = this.filterDate
        ? student.createdDate?.includes(this.filterDate)
        : true;
      return matchesText && matchesDate;
    });
  }

  onFilterChange() {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }
}
