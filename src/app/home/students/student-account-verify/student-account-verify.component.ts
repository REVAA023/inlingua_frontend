import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PinControlComponent } from '../../../app-core/form-input/pin-control/pin-control.component';
import { Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';

@Component({
  selector: 'app-student-account-verify',
  standalone: true,
  imports: [
    FormsModule,
    PinControlComponent,
  ],
  templateUrl: './student-account-verify.component.html',
  styleUrls: ['./student-account-verify.component.scss']
})
export class StudentAccountVerifyComponent {

  numberotp = 0;
  gmailotp = 0;

  constructor(
    private router: Router,
    private apiService: ApplicationApiService
  ) { }

  studentAccountVerification() {
    const obj = {
      numberotp: this.numberotp,
      gmailotp: this.gmailotp
    };
    const option = { hideJwt: true };

    this.apiService.studentAccountVerification(obj, option).subscribe((response) => {
      console.log(response);
      // Handle success here
    });
  }

  onSubmit(l: any) {
    if (!l.valid) {
      console.log('Invalid data');
    } else {
      console.log(this.numberotp);
      console.log(this.gmailotp);
      console.log('Form submitted');
      this.studentAccountVerification(); // Optionally trigger API call here
    }
  }
}
