import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { entDocument, entRegisterForm } from '../../../common/api-services/application-api/application-api.classes';
import { Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UrlService } from '../../../common/services/url/url.service';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-batchs',
  imports: [
    InputControlComponent,
    FormsModule,
    NgClass,
    MatCheckboxModule,
    MatDialogModule
  ],
  templateUrl: './create-batchs.component.html',
  styleUrl: './create-batchs.component.scss'
})
export class CreateBatchsComponent {
  currentStep = 1;
  errorTrue = false;

  newBatchForm = {
    language: null as any,
    courseLevel: null as any,
    batchPreferences: null as any,
    batchType: null as any,
    startTime: null as any,
    endTime: null as any,
    startDate: null as any,
    endDate: null as any,
    studentList: null as any,
    trainerID: null as any
  };


  languages: any;
  levelAndHour: any;
  batchPreferences: any;
  batchDetails: any;
  students: any;
  trainers: any;


  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private dialog: MatDialog,
    private urlService: UrlService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getLanguage();
    await this.getStudentDetailsChoices();
    console.log(this.batchPreferences);

  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getStepClass(step: number): string {
    if (step < this.currentStep) return 'step completed';
    if (step === this.currentStep) return 'step active';
    return 'step';
  }

  getLanguage() {
    const option = { hideJwt: true };
    this.apiService.getLanguage(option).subscribe((response: any) => {
      this.languages = response;
    });
  }

  getLevelAndHours(Id: any) {
    const obj = { levelId: Id };
    const option = { hideJwt: true };
    this.apiService.getLevelAndHours(obj, option).subscribe((responce: any) => {
      this.levelAndHour = responce;
    });
  }

  getStudentDetailsChoices() {
    const option = { hideJwt: true };
    this.apiService.getStudentDetailsChoices(option).subscribe((response: any) => {
      this.batchDetails = response;
      this.batchPreferences = response.BATCH_PREFERENCES_CHOICES
    });
  }

  getDocument(event: any, type?: string) {
    const documentObj = {
      documentName: event.fileName,
      documentSize: event.fileSize,
      documentContant: event.content,
      documentsExtention: event.fileType,
      createdDate: new Date().toISOString()
    };

    if (type === 'BATCHICON') {
      // this.newBatchForm.batchIcon = documentObj;
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

    // if (type === 'BATCHICON') this.newBatchForm.batchIcon = emptyDoc;
  }

  onSubmit(form: any) {

    if (!form.valid) {
      this.errorTrue = true;
      return;
    }
    this.errorTrue = false;

    if (this.currentStep === 1) {
      const obj = {
        language: this.newBatchForm.language,
        courseLevels: this.newBatchForm.courseLevel,
        batchPreferences: this.newBatchForm.batchPreferences,
        BatchType: this.newBatchForm.batchType,
        startTime: this.newBatchForm.startTime,
        endTime: this.newBatchForm.endTime

      }
      this.apiService.getStudentAndTrainer(obj).subscribe((response: any) => {
        this.students = response.students;
        this.trainers = response.trainers;

      })
      this.currentStep++;
      return;
    }
    if (this.currentStep === 2) {
      const obj = {
        newBatchForm: this.newBatchForm
      }
      this.apiService.createBatch(obj).subscribe((response: any) => {
        this.newBatchForm = {
          language: null as any,
          courseLevel: null as any,
          batchPreferences: null as any,
          batchType: null as any,
          startTime: null as any,
          endTime: null as any,
          startDate: null as any,
          endDate: null as any,
          studentList: null as any,
          trainerID: null as any
        };
        this.currentStep--;
      })
    }
  }
}
