import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApplicationApiService } from '../common/api-services/application-api/application-api.service';
import { StorageService } from '../common/services/storage/storage.service';
import { DataService } from '../common/services/data/data.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  standalone: true,  // Ensure it's a standalone component
  imports: [
    FormsModule
  ],  // Include FormsModule
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  emailOrPhone: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router,
    public apiService: ApplicationApiService,
    public storage: StorageService,
    public data: DataService,
  ) { }

  async ngOnInit(): Promise<void> {

  }
  onLogin() {
    if (this.emailOrPhone && this.password) {


      const obj = {
        identifier: this.emailOrPhone,
        password: this.password
      }

      const option = {
        hideJwt: true
      }

      this.apiService.login(obj, option).subscribe((response) => {
        console.log(response);
        this.storage.set('token', response.token);
        this.storage.set('userData', response.userData);
        this.router.navigateByUrl('/dashboard')
      })
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



}
