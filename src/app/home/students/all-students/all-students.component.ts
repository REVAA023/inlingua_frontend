import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { XSpinnerComponent } from '../../../common/spinner/spinner.component';

@Component({
  selector: 'app-all-students',
  imports: [
    InputControlComponent,
    XSpinnerComponent
  ],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent {
  allStudents: any;

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
      this.isLoading = true;
    });
  }

  showDetails(id: any) {

  }

  async navigate(id: any) {
    let urlJson = await this.url.encode(id);
    this.router.navigateByUrl("students/details/" + urlJson)
  }
}
