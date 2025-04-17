import { isValid } from 'date-fns';
import { Component } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';

@Component({
  selector: 'app-leadsheet',
  imports: [InputControlComponent, FormsModule, NgClass, FileSelectorComponent],
  templateUrl: './leadsheet.component.html',
  styleUrl: './leadsheet.component.scss',
})
export class LeadsheetComponent {
  currentStep = 1;

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
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
  constructor(
    private router: Router,
    private apiService: ApplicationApiService
  ) {}
  ngOnInit(): void {
    this.getLanguage();
    this.getStudentDetailsChoices()
  }

  leadSheet = {
    FirstName: '',
    LastName: '',
    MobileNumber: '',
    dob: '',
    gmail: '',
    languageId: 0,
    LevelId: 0,
    CourseTypeId: 0,
    ModeOfClassId: 0,
    counselorId: 0,
    TransactionId: '',
    paymentTypeId: 0,
    amountPaid: '',
  };

  languages: any = {};
  levelAndHour: any = {};
  studentDetailsChoices: any = {};


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
      console.log(responce);

    });
  }

  onSubmit(l:any){
    if (l.valid) {
      console.log(l);
      console.log(this.leadSheet);

    }
    else{
      console.log('invalid form');
    }
  }

  getValues(event: any) {
    console.log(event);

  }
}
