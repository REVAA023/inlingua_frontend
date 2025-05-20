import { UrlService } from './../../../common/services/url/url.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PinControlComponent } from '../../../app-core/form-input/pin-control/pin-control.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { ConfettiService } from '../../../common/services/confetti/confetti.service';

@Component({
  selector: 'app-student-account-verify',
  standalone: true,
  imports: [
    FormsModule,
    PinControlComponent,
    RouterModule
  ],
  templateUrl: './student-account-verify.component.html',
  styleUrls: ['./student-account-verify.component.scss']
})
export class StudentAccountVerifyComponent {

  numberotp = 0;
  gmailotp = 0;
  strEmail = ""
  strNumber = ""

  formSuccess = false;

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private confettiService: ConfettiService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.urlService.decode(params['email']).then(email => {
        this.strEmail = email as string;
      });

      this.urlService.decode(params['phone']).then(phone => {
        this.strNumber = phone as string;
      });
    });
  }

  // success pop
  successPop() {
    if (this.formSuccess) {
      this.confettiService.start(); // animation auto stops when done
    }
  }

  reSendOtp() {
    const obj = {
      "gmail": this.strEmail,
      "MobileNumber": this.strNumber
    }
    const option = { hideJwt: true };
    this.apiService.otpSender(obj, option).subscribe((response: any) => {

    });
  }

  studentAccountVerification() {
    const storedForm = sessionStorage.getItem('registerForm');

    const obj = {
      numberotp: this.numberotp,
      gmailotp: this.gmailotp,
      parsed: storedForm ? JSON.parse(storedForm) : {}
    };
    const option = { hideJwt: true };

    this.apiService.studentAccountVerification(obj, option).subscribe((response) => {
      console.log(response);
      this.formSuccess = true
      // Handle success here
      this.successPop();
    });
  }

  onSubmit(l: any) {
    if (!l.valid) {
      console.log('Invalid data');
    } else {
      this.studentAccountVerification();
    }
  }
}
