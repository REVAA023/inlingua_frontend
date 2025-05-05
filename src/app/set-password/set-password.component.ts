import { isValid } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputControlComponent } from '../app-core/form-input/input-control/input-control.component';
import { ApplicationApiService } from '../common/api-services/application-api/application-api.service';
import { PageLodingComponent } from '../app-core/page-loding/page-loding.component';

@Component({
  selector: 'app-set-password',
  imports: [
    FormsModule,
    InputControlComponent,
    PageLodingComponent
  ],
  standalone: true,
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  isLoading = false;
  showTokenError: boolean = false;
  token: string = '';
  errorTrue = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApplicationApiService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    this.checkPassswordToken();
  }
  password = "";
  conformPassword = "";

  checkPassswordToken(){
    const obj = {
      token: this.token
    };
    const option = { hideJwt: true };
    this.apiService.checkPassswordToken(obj, option).subscribe((response) => {
      this.showTokenError = response.success
      console.log('Token response:', response.success);
    })
    this.isLoading = true;
  }

  onSubmit(l: any) {
    console.log('Form submitted:', this.password, this.conformPassword);
    if (l.valid) {
      if (!this.password || !this.conformPassword) {
        alert('Please fill in all fields');
        return;
      }

      if (this.password !== this.conformPassword) {
        alert('Password and confirm password do not match.');
        return;
      }

      const payload = {
        token: this.token,
        password: this.password,
      };
      const option = { hideJwt: true };
      this.apiService.setPassword(payload, option).subscribe((response) => {
        if (response.flag) {
          alert('Password updated successfully!');
          this.password = '';
          this.conformPassword = '';
        } else {
          alert('Failed to update password. Please try again.');
        }
      });
    }
  }
  }


