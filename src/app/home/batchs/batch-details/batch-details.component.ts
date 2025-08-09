import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AppService } from '../../../app.service';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent, DialogData } from '../../../app-core/alert/alert.component';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../../common/WebSocketService/web-socket-service';

@Component({
  selector: 'app-batch-details',
  imports: [
    PageLodingComponent,
    InputControlComponent,
    FileSelectorComponent,
    FormsModule,
  ],
  templateUrl: './batch-details.component.html',
  styleUrl: './batch-details.component.scss'
})
export class BatchDetailsComponent {
  private wsSub!: Subscription;

  isLoading = false;
  isEnabled = true;
  errorTrue = false;
  batchDetails: any;
  studentsDetails: any;
  related_trainers: any;
  related_students: any;
  videoRecords: any;

  containeropen = false;

  // Initialize with default values - will be updated after batchDetails is loaded
  videoRecordForm = {
    batchId: null as any, // Will be set when batchDetails is loaded
    video: {
      createdDate: "",
      documentContant: "",
      documentName: "",
      documentSize: "",
      documentsExtention: ""
    },
    note: ""
  };

  getDocument(event: any, type?: string) {
    const documentObj = {
      documentName: event.fileName,
      documentSize: event.fileSize,
      documentContant: event.content,
      documentsExtention: event.fileType,
      createdDate: new Date().toISOString()
    };

    if (type === 'VIRC') {
      this.videoRecordForm.video = documentObj;
    }
  }

  removeImage(type: string) {
    const emptyDoc = {
      documentName: '',
      documentSize: '',
      documentContant: '',
      documentsExtention: '',
      createdDate: ''
    };

    if (type === 'VIRC') {
      this.videoRecordForm.video = emptyDoc;
    }
  }

  batchIdPayload: any;

  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService,
    public appservice: AppService,
    private dialog: MatDialog,
    private webSocketService: WebSocketService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();

    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    const payload = {
      batchId: obj
    };
    this.batchIdPayload = payload;
    this.getBatchDetails(payload);
    // Connect to backend
    this.webSocketService.connectClassroomUpdates();

    // Listen for messages
    this.wsSub = this.webSocketService.getMessages().subscribe(data => {
      if (this.batchDetails.id === data.id) {
        this.batchDetails.isActive = data.is_active;
      }
    });
  }

  ngOnDestroy() {
    // Close connection and unsubscribe
    if (this.wsSub) {
      this.wsSub.unsubscribe();
    }
    this.webSocketService.closeConnection();
  }

  edit_class_room() {
    this.isEnabled = !this.isEnabled;
  }

  updatetrainer(id: any) {
    const payload = {
      trainerId: id,
      batchId: this.batchDetails.id
    };
    this.apiService.updatetrainer(payload).subscribe((response: any) => {
      this.getBatchDetails(this.batchIdPayload);
    });
  }

  removestudent(id: any) {
    const payload = {
      studentId: id
    };
    this.apiService.removestudent(payload).subscribe((response: any) => {
      this.getBatchDetails(this.batchIdPayload);
    });
  }

  addStudent(id: any) {
    const payload = {
      studentId: id,
      batchId: this.batchDetails.id
    };
    this.apiService.addStudent(payload).subscribe((response: any) => {
      this.getBatchDetails(this.batchIdPayload);
    });
  }

  getBatchDetails(payload: any) {
    this.apiService.getBatchDetails(payload).subscribe((response: any) => {
      this.batchDetails = response.batch;
      this.studentsDetails = response.students;
      this.related_trainers = response.related_trainers;
      this.related_students = response.related_students;
      this.videoRecords = response.get_videos;
      this.videoRecordForm.batchId = this.batchDetails.id;
      this.isLoading = true;
    });
  }

  cancelChanges() {
    this.isEnabled = true;
  }

  startClass() {
    const payload = {
      batchId: this.batchDetails.id,
    };
    this.apiService.startClass(payload).subscribe((response: any) => {
      this.batchDetails.isActive = true;
      console.log('Batch updated successfully');
    });
    window.open(this.batchDetails.googleMeetLink, '_blank');
  }

  endClass() {
    const payload = {
      batchId: this.batchDetails.id,
    };
    this.apiService.endClass(payload).subscribe((response: any) => {
      this.batchDetails.isActive = false;
      this.isEnabled = true;
      console.log('Batch updated successfully');
    });
  }

  uploadVideoContainer() {
    this.containeropen = true;
  }

  recordVideo(form: NgForm): void {
    if (!form.valid) {
      this.errorTrue = true;
      return;
    }

    this.errorTrue = false;

    if (!this.videoRecordForm.video.documentName) {
      this.dialog.open(AlertComponent, {
        data: <DialogData>{
          msg: 'Please upload Class Record Video',
          type: 'sessionAlert',
          flag: true,
          header: 'Missing Document',
          confirmationText: '',
          closeIconHidden: false,
        },
        disableClose: true,
        hasBackdrop: true
      });
      return;
    }

    // Ensure batchId is set
    if (!this.videoRecordForm.batchId && this.batchDetails?.id) {
      this.videoRecordForm.batchId = this.batchDetails.id;
    }
    console.log('Payload:', this.videoRecordForm);
    // Add your API call here
    this.apiService.saveVideoRecord(this.videoRecordForm).subscribe((response: any) => {
      console.log('Success:', response);
      this.cancelForm();

    });
  }

  cancelForm(): void {
    // Reset form
    this.videoRecordForm = {
      batchId: this.batchDetails?.id || null,
      video: {
        documentName: '',
        documentSize: '',
        documentContant: '',
        documentsExtention: '',
        createdDate: ''
      },
      note: ''
    };
    this.errorTrue = false;
    this.containeropen = false;
  }

  onSubmit(form: NgForm): void {
    if (this.appservice.user.userRole === "SUSER") {
      if (!form.valid) {
        return;
      } else {
        const payload = {
          batchId: this.batchDetails.id,
          googleMeetLink: this.batchDetails.googleMeetLink
        };
        this.apiService.updateBatchGoogleMeetLink(payload).subscribe((response: any) => {
          console.log('Batch updated successfully');
          this.isEnabled = true;
        });
      }
    }

    if (this.appservice.user.userRole === "TRAINER") {
      if (!form.valid) {
        return;
      } else {
        const payload = {
          batchId: this.batchDetails.id,
          Complited: this.batchDetails.isComplited
        };
        this.apiService.updatecomplitedclass(payload).subscribe((response: any) => {
          console.log('Batch updated successfully');
          this.isEnabled = true;
        });
      }
    }

  }
}
