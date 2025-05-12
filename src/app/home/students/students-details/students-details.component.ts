import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { FormsModule } from '@angular/forms';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

@Component({
  selector: 'app-students-details',
  imports: [
    InputControlComponent,
    FormsModule,
    PageLodingComponent
  ],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.scss'
})
export class StudentsDetailsComponent implements OnInit {
  isLoading = false;
  isEnabled = true;

  studentDetailsChoices: any = {};

  constructor(
    public data: DataService,
    public router : Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService
  ) {}

  async ngOnInit(): Promise<void> {

    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    await this.data.checkToken();
    const payload ={
      studentId:obj
    }
    this.getStudentDetails(payload);
    this.getStudentDetailsChoices();
  }

  studentDetails: any;

  getStudentDetails(id: any) {
    this.apiService.getStudentDetails(id).subscribe((response: any) => {
      this.studentDetails = response;
      console.log("Student Details",this.studentDetails);
      this.isEnabled =  true;
      this.isLoading = true;
    })
  }

  getStudentDetailsChoices() {
    const option = { hideJwt: true };
    this.apiService.getStudentDetailsChoices(option).subscribe((response: any) => {
      this.studentDetailsChoices = response;
      console.log(this.studentDetailsChoices);
    });
  }

  changeStudentStatus(value: any){
    const obj = {status: value, student_id: this.studentDetails.student.id};
    this.apiService.changeStudentStatus(obj).subscribe((response: any) => {
      console.log(response);
      this.studentDetails.student.status = value;
    })
  }

  editDetails(){
    console.log(this.studentDetails);
    this.isEnabled = false;
  }
  deliteDetails(){
    console.log(this.studentDetails.student.user.id);
  }

  goBack(){
    this.router.navigateByUrl('students')
  }
}
