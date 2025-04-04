import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-auth',
  standalone: true,  // Ensure it's a standalone component
  imports: [FormsModule],  // Include FormsModule
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  emailOrPhone: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    if (this.emailOrPhone && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
