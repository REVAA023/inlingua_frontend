import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { FormsModule } from '@angular/forms';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';

@Component({
  selector: 'app-students-details',
  imports: [
    InputControlComponent,
    FormsModule,
    PageLodingComponent,
  ],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.scss'
})
export class StudentsDetailsComponent implements OnInit {
  isLoading = false;
  isEnabled = true;
  previewImageUrl: string = '';
  previewTitle: string = '';

  //
  studentDetails: any;
  studentDetailsChoices: any = {};
  nameOfTheCounselor = '';
  videoRecords: any;

  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService,
    private appSetting: AppSettingsService
  ) { }

  async ngOnInit(): Promise<void> {
    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    await this.data.checkToken();
    const payload = {
      studentId: obj
    }
    this.getStudentDetails(payload);
    this.getStudentDetailsChoices();
  }

  // Getter for counselor full name with safe navigation
  get counselorFullName(): string {
    if (this.studentDetails?.student?.nameOfCounselor?.user?.firstName &&
      this.studentDetails?.student?.nameOfCounselor?.user?.lastName) {
      return `${this.studentDetails.student.nameOfCounselor.user.firstName} ${this.studentDetails.student.nameOfCounselor.user.lastName}`;
    } else if (this.studentDetails?.student?.nameOfCounselor?.user?.firstName) {
      return this.studentDetails.student.nameOfCounselor.user.firstName;
    }
    return '';
  }

  // Setter for counselor full name (if editing is needed)
  set counselorFullName(value: string) {
    if (this.studentDetails?.student?.nameOfCounselor?.user) {
      const names = value.split(' ');
      this.studentDetails.student.nameOfCounselor.user.firstName = names[0] || '';
      this.studentDetails.student.nameOfCounselor.user.lastName = names.slice(1).join(' ') || '';
    }
  }

  openImagePreview(imageUrl: string, title: string): void {
    this.previewImageUrl = imageUrl;
    this.previewTitle = title;

    // Open Bootstrap modal
    const modal = new (window as any).bootstrap.Modal(document.getElementById('imagePreviewModal'));
    modal.show();
  }

  getStudentDetails(id: any) {
    this.apiService.getStudentDetails(id).subscribe((response: any) => {
      this.studentDetails = response;
      this.nameOfTheCounselor = this.counselorFullName;
      this.videoRecords = response.class_records;
      console.log(this.studentDetails);
      console.log("video",this.videoRecords);

      this.isEnabled = true;
      this.isLoading = true;
    })
  }

  getStudentDetailsChoices() {
    const option = { hideJwt: true };
    this.apiService.getStudentDetailsChoices(option).subscribe((response: any) => {
      this.studentDetailsChoices = response;
    });
  }

  changeStudentStatus(value: any) {
    const obj = { status: value, student_id: this.studentDetails.student.id };
    this.apiService.changeStudentStatus(obj).subscribe((response: any) => {
      this.data.successMessage('Status Updated Successfully');
      this.getStudentDetails({ studentId: this.studentDetails.student.id });
    })
  }

  editDetails() {
    console.log(this.studentDetails);
    this.isEnabled = false;
  }

  deliteDetails() {
    console.log(this.studentDetails.student.user.id);
  }

  goBack() {
    this.router.navigateByUrl('students')
  }

  sendRecordVideo(videoId: any) {
    const payload = {
      studentId: this.studentDetails.student.id,
      videoId: videoId
    }
    console.log(payload);

    this.apiService.sendRecordVideo(payload).subscribe((response: any) => {
      this.getStudentDetails({ studentId: this.studentDetails.student.id });
      this.data.successMessage(response.message);
    })

  }

  removeRecordVideo(videoId: any) {
    const payload = {
      studentId: this.studentDetails.student.id,
      videoId: videoId
    }
    console.log(payload);

    this.apiService.sendRecordVideo(payload).subscribe((response: any) => {
      this.getStudentDetails({ studentId: this.studentDetails.student.id });
      this.data.successMessage(response.message);
    })

  }
}
