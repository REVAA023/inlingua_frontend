import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { entRegisterForm, entDocument } from '../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertComponent, DialogData } from '../../../app-core/alert/alert.component';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-students-register-form',
  standalone: true,
  imports: [
    InputControlComponent,
    FormsModule,
    NgClass,
    FileSelectorComponent,
    MatCheckboxModule,
    MatDialogModule
  ],
  templateUrl: './students-register-form.component.html',
  styleUrl: './students-register-form.component.scss'
})
export class StudentsRegisterFormComponent {
  currentStep = 1;
  errorTrue = false;

  registersheet = new entRegisterForm();

  formLanguageId: any;

  languages: any = {};
  levelAndHour: any = {};
  studentDetailsChoices: any = {};
  StudentCounselors: any = {};

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private dialog: MatDialog,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.getLanguage();
    this.getStudentDetailsChoices();
    this.getStudentCounselors();
    this.restoreFormFromSession();
  }

  restoreFormFromSession() {
    const storedForm = sessionStorage.getItem('registerForm');
    if (storedForm) {
      const parsed = JSON.parse(storedForm);
      this.registersheet = new entRegisterForm();
      Object.assign(this.registersheet, parsed);

      this.getLevelAndHours(parsed.courseTypeId)
      // Restore nested entDocument objects
      this.registersheet.studentPhoto = Object.assign(new entDocument(), parsed.studentPhoto);
      this.registersheet.aadharCard = Object.assign(new entDocument(), parsed.aadharCard);
      this.registersheet.paymentScreenShot = Object.assign(new entDocument(), parsed.paymentScreenShot);
      console.log('Restored registersheet:', this.registersheet);
    }
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

  getStudentDetailsChoices() {
    const option = { hideJwt: true };
    this.apiService.getStudentDetailsChoices(option).subscribe((response: any) => {
      this.studentDetailsChoices = response;
    });
  }

  getLevelAndHours(Id: any) {
    const obj = { levelId: Id };
    const option = { hideJwt: true };
    this.apiService.getLevelAndHours(obj, option).subscribe((responce: any) => {
      this.levelAndHour = responce;
    });
  }

  getStudentCounselors() {
    const option = { hideJwt: true };
    this.apiService.getStudentCounselors(option).subscribe((response: any) => {
      this.StudentCounselors = response;
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

    if (type === 'STUPD') {
      this.registersheet.studentPhoto = documentObj;
    } else if (type === 'AADHAR') {
      this.registersheet.aadharCard = documentObj;
    } else if (type === 'payment-screenshot') {
      this.registersheet.paymentScreenShot = documentObj;
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

    if (type === 'STUPD') this.registersheet.studentPhoto = emptyDoc;
    if (type === 'AADHAR') this.registersheet.aadharCard = emptyDoc;
    if (type === 'payment-screenshot') this.registersheet.paymentScreenShot = emptyDoc;
  }

  onSubmit(form: any) {
    if (!form.valid) {
      this.errorTrue = true;
      return;
    }

    this.errorTrue = false;

    if (this.currentStep === 1) {
      if (this.registersheet.aadharCard.documentSize) {
        this.currentStep++;
        console.log(this.registersheet.aadharCard)
        return;
      }

      this.dialog.open(AlertComponent, {
        data: <DialogData>{
          msg: 'Please upload Aadhar card',
          type: 'alertMsg',
          flag: true,
          header: 'Missing Document',
          confirmationText: '',
          closeIconHidden: false
        }
      });
      return;
    }

    if (this.currentStep === 2) {
      this.currentStep++;
      return;
    }

    if (this.currentStep === 3) {
      if (this.registersheet.paymentScreenShot.documentSize) {
        this.currentStep++;
        return;
      }

      this.dialog.open(AlertComponent, {
        data: <DialogData>{
          msg: 'Please upload payment screenshot',
          type: 'alertMsg',

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

    if (this.currentStep === 4) {
      const obj = {
        "gmail": this.registersheet.gmail,
        "MobileNumber": this.registersheet.MobileNumber
      }
      if (this.registersheet.isaggery) {
        sessionStorage.setItem('registerForm', JSON.stringify(this.registersheet));
        console.log('Submitting form:', this.registersheet);

        const option = { hideJwt: true };
        this.apiService.otpSender(obj, option).subscribe((response: any) => {
          this.urlService.encode(this.registersheet.gmail).then(email => {
            this.urlService.encode(this.registersheet.MobileNumber).then(number => {
              this.router.navigate(['student-account-verification'], {
                queryParams: {
                  email: email,
                  phone: number
                }
              });
            });
          });

        });

        return;
      }
    }
  }
}
