  import { NgClass } from '@angular/common';
  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { Router } from '@angular/router';
  import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';
  import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
  import { entRegisterForm } from '../../../common/api-services/application-api/application-api.classes';
  import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
  import { MatCheckboxModule } from '@angular/material/checkbox';

  @Component({
    selector: 'app-students-register-form',
    imports: [InputControlComponent, FormsModule, NgClass, FileSelectorComponent, MatCheckboxModule],
    templateUrl: './students-register-form.component.html',
    styleUrl: './students-register-form.component.scss'
  })
  export class StudentsRegisterFormComponent {
    currentStep = 1;
    errorTrue = false;

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
    constructor(
      private router: Router,
      private apiService: ApplicationApiService
    ) {}
    ngOnInit(): void {
      this.getLanguage();
      this.getStudentDetailsChoices();
      this.getStudentCounselors();
    }

    leadSheet = new entRegisterForm()

    languages: any = {};
    levelAndHour: any = {};
    studentDetailsChoices: any = {};
    StudentCounselors: any = {};


    getLanguage() {
      const option = { hideJwt: true };
      this.apiService.getLanguage(option).subscribe((response: any) => {
        this.languages = response;
      });
    }

    getStudentDetailsChoices() {
      const option = { hideJwt: true };
      this.apiService.getStudentDetailsChoices(option).subscribe((response: any) => {
        this.studentDetailsChoices = response;
      });
    }

    getLevelAndHours(Id: any) {
      const obj = {
        levelId: Id,
      };
      const option = { hideJwt: true };
      this.apiService.getLevelAndHours(obj, option).subscribe((responce: any) => {
        this.levelAndHour = responce;
      });
    }

    getStudentCounselors(){
      const option = { hideJwt: true };
      this.apiService.getStudentCounselors(option).subscribe((response: any) => {
        this.StudentCounselors = response;
      });
    }

    getDocument(event: any, type?: string) {
      if (type === 'STUPD' && event) {
        this.leadSheet.studentPhoto = {
          documentName: event.fileName,
          documentSize: event.fileSize,
          documentContant: event.content,
          documentsExtention: event.fileType,
          createdDate: new Date().toISOString(),
        };
      }
      else if (type === 'AADHAR' && event) {
        this.leadSheet.aadharCard = {
          documentName: event.fileName,
          documentSize: event.fileSize,
          documentContant: event.content,
          documentsExtention: event.fileType,
          createdDate: new Date().toISOString(),
        };
      }
      else if (type === 'payment-screenshot' && event) {
        this.leadSheet.paymentScreenShot = {
          documentName: event.fileName,
          documentSize: event.fileSize,
          documentContant: event.content,
          documentsExtention: event.fileType,
          createdDate: new Date().toISOString(),
        };
      }
    }

    removeImage(type: string) {
      if (type === 'STUPD') {
        this.leadSheet.studentPhoto = {
          documentName: '',
          documentSize: '',
          documentContant: '',
          documentsExtention: '',
          createdDate: '',
        };
      }
      if (type === 'AADHAR') {
        this.leadSheet.aadharCard = {
          documentName: '',
          documentSize: '',
          documentContant: '',
          documentsExtention: '',
          createdDate: '',
        };
      }
      if (type === 'payment-screenshot') {
        this.leadSheet.paymentScreenShot = {
          documentName: '',
          documentSize: '',
          documentContant: '',
          documentsExtention: '',
          createdDate: '',
        };
      }
    }

    onSubmit(l:any){
      if (l.valid) {

        this.errorTrue = false;
        if (this.currentStep === 1){
          if (this.leadSheet.aadharCard.documentSize){
          this.currentStep ++
          return;
          }
          {
            alert('Please upload Aadhar card');
            return;
          }
        }
        if (this.currentStep === 2){
          this.currentStep ++
          return;
        }
        if (this.currentStep === 3){
          if (this.leadSheet.paymentScreenShot.documentSize){
            this.currentStep ++
            return;
          }
          else{
            alert('Please upload payment screenshot');
            return;
          }
        }
        if (this.currentStep === 4){
          console.log(this.leadSheet);
        }
      }
      else{
        this.errorTrue = true;
      }
    }

  }
