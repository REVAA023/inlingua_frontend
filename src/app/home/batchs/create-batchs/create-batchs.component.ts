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
import { AlertComponent, DialogData } from '../../../app-core/alert/alert.component';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';

@Component({
  selector: 'app-create-batchs',
  imports: [
    InputControlComponent,
    FormsModule,
    NgClass,
    FileSelectorComponent,
    MatCheckboxModule,
    MatDialogModule
  ],
  templateUrl: './create-batchs.component.html',
  styleUrl: './create-batchs.component.scss'
})
export class CreateBatchsComponent {
  currentStep = 1;
  errorTrue = false;

  neBatchForm = {
  language: null as any,
  courseLevel: null as any,
  batchPreferences: null as any,
  batchType: null as any,
  startTime: null as any,
  endTime: null as any,
  startDate: null as any,
  endDate: null as any,
  batchIcon: {
    documentName: '',
    documentSize: '',
    documentContant: '',
    documentsExtention: ''
  },
  studentList: null as any,
  trainerID: null as any
};


    languages: any;
    levelAndHour: any;
    batchPreferences = [
      { id: 'WEND', name: 'Weekend' },
      { id: "WDAY", name: 'Week Days' },
    ];
    batchDetails: any;

    students : any;
    trainers : any;


  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private dialog: MatDialog,
    private urlService: UrlService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getLanguage();
    await this.getStudentDetailsChoices();
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
    debugger
    const option = { hideJwt: true };
    this.apiService.getLanguage(option).subscribe((response: any) => {
      this.languages = response;
      console.log('languages', this.languages.languages);
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
      console.log('batchDetails', this.batchDetails);

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
      this.neBatchForm.batchIcon = documentObj;
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

    if (type === 'BATCHICON') this.neBatchForm.batchIcon = emptyDoc;
  }

  onSubmit(form: any) {

    console.log(this.neBatchForm);

    if (!form.valid) {
      this.errorTrue = true;
      return;
    }



    this.errorTrue = false;

    if (this.currentStep === 1) {
      const obj = {
        language: this.neBatchForm.language,
        courseLevels: this.neBatchForm.courseLevel,
        batchPreferences: this.neBatchForm.batchPreferences,
        BatchType : this.neBatchForm.batchType,
        startTime : this.neBatchForm.startTime,
        endTime : this.neBatchForm.endTime

      }
      this.apiService.getStudentAndTrainer(obj).subscribe((response: any) =>{
        this.students = response.students;
        console.log(this.students);

      })
      this.currentStep++;
      return;
    }
    if (this.currentStep === 2) {
      console.log(this.neBatchForm);

    }
  }
}
