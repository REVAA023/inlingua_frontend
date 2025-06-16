import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from '../../../common/services/url/url.service';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';
import { PinControlComponent } from '../../../app-core/form-input/pin-control/pin-control.component';

@Component({
  selector: 'app-create-trainer',
  imports: [
    InputControlComponent,
    NgClass,
    FormsModule,
    PinControlComponent,
  ],
  templateUrl: './create-trainer.component.html',
  styleUrl: './create-trainer.component.scss'
})
export class CreateTrainerComponent {
  currentStep = 1;
  errorTrue = false;

  trainerForm = {
    trainerName: '',
    trainerEmail: '',
    phoneNumber: '',
    selectLanguage: [],
    gmailOtp: '',
    mobileOtp: ''
  };
  languages: any;

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private dialog: MatDialog,
    private urlService: UrlService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getLanguage();
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
      this.languages = response.languages;
    });
  }

  onSubmit(form: any) {

    if (!form.valid) {
      this.errorTrue = true;
      return;
    }
    this.errorTrue = false;

    if (this.currentStep === 1) {
      const obj = {
        "gmail": this.trainerForm.trainerEmail,
        "MobileNumber": this.trainerForm.phoneNumber
      }
      const option = { hideJwt: true };
      this.apiService.otpSender(obj, option).subscribe((response: any) => {
        this.currentStep++;
        return;
      });
    }
    if (this.currentStep === 2) {
      this.apiService.createTrainer(this.trainerForm).subscribe((response: any) => {
        this.router.navigate(['trainers']);
      });
    }
  }
}
