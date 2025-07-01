import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-batch-details',
  imports: [
    PageLodingComponent,
    InputControlComponent,
    FormsModule
  ],
  templateUrl: './batch-details.component.html',
  styleUrl: './batch-details.component.scss'
})
export class BatchDetailsComponent {
  isLoading = false;
  isEnabled = true;
  batchDetails: any;
  studentsDetails: any;
  related_trainers: any;
  related_students: any;
  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService,
    public appservice: AppService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    const payload = {
      batchId: obj
    }
    this.getBatchDetails(payload);
    this.isLoading = true;
  }
  edit_class_room() {
    this.isEnabled = !this.isEnabled;
  }

  updatetrainer(id: any) {
    const payload = {
      trainerId: id,
      batchId: this.batchDetails.id
    }
    this.apiService.updatetrainer(payload).subscribe((response: any) => {

    })
  }

  removestudent(id: any) {
    const payload = {
      studentId: id
    }
    this.apiService.removestudent(payload).subscribe((response: any) => {

    })
  }

  addStudent(id: any) {
    const payload = {
      studentId: id,
      batchId: this.batchDetails.id
    }
    this.apiService.addStudent(payload).subscribe((response: any) => {

    })

  }

  getBatchDetails(payload: any) {
    this.apiService.getBatchDetails(payload).subscribe((response: any) => {
      this.batchDetails = response.batch;
      this.studentsDetails = response.students;
      this.related_trainers = response.related_trainers;
      this.related_students = response.related_students;
      console.log('related_students:', this.batchDetails);
      console.log('studentsDetails:', this.studentsDetails);

    })
  }

  cancelChanges() {
    this.isEnabled = true;
  }

  startClass() {
    const payload = {
      batchId: this.batchDetails.id,
    }
    this.apiService.startClass(payload).subscribe((response: any) => {
      this.batchDetails.isActive = true;
      console.log('Batch updated successfully');
    });
    window.open(this.batchDetails.googleMeetLink, '_blank');
  }

  endClass() {
    const payload = {
      batchId: this.batchDetails.id,
    }
    this.apiService.endClass(payload).subscribe((response: any) => {
      this.batchDetails.isActive = false;
      this.isEnabled = true;
      console.log('Batch updated successfully');
    });
  }

  onSubmit(form: any): void {
    if (this.appservice.user.userRole === "SUSER") {
      if (!form.valid) {
        return;
      }
      else {
        const payload = {
          batchId: this.batchDetails.id,
          googleMeetLink: this.batchDetails.googleMeetLink
        }
        this.apiService.updateBatchGoogleMeetLink(payload).subscribe((response: any) => {
          console.log('Batch updated successfully');
        });
      }
    }
    if (this.appservice.user.userRole === "TRAINER") {
      if (!form.valid) {
        return;
      }
      else {
        const payload = {
          batchId: this.batchDetails.id,
          Complited: this.batchDetails.isComplited
        }
        this.apiService.updatecomplitedclass(payload).subscribe((response: any) => {
          console.log('Batch updated successfully');
          this.isEnabled = true;
        });
      }
    }
  }


}
