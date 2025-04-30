import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-details',
  imports: [
    InputControlComponent,
    PageLodingComponent,
    FormsModule
  ],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.scss'
})
export class StudentsDetailsComponent implements OnInit {
  isLoading = false;
  isEnabled = true;

  firstName = "";
  lastName = "";
  email = "";
  mobileNumber = "";
  dateOfBirth = "";
  professions = "";


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

  }

  studentDetails: any;

  getStudentDetails(id: any) {
    this.apiService.getStudentDetails(id).subscribe((response: any) => {
      this.studentDetails = response;
      this.isEnabled =  true;
      console.log(this.studentDetails);
      this.firstName = this.studentDetails.student.user.firstName;
      this.lastName = this.studentDetails.student.user.lastName;
      this.isLoading = true;
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
