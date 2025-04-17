import { FormsModule } from '@angular/forms';
import { InputControlComponent } from './../../../app-core/form-input/input-control/input-control.component';
import { Component } from '@angular/core';
import { Row } from "../../../app-core/core-component/core-component.component";

@Component({
  selector: 'app-add-leads',
  imports: [
    InputControlComponent,
    FormsModule,
    Row
],
  templateUrl: './add-leads.component.html',
  styleUrl: './add-leads.component.scss'
})
export class AddLeadsComponent {

  today: string;

  constructor() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0]; // Format: yyyy-mm-dd
  }

  firstName: string = '';

  errorTrue = false;


  onSubmit(l: any) {
    if (l.valid) {
      this.errorTrue = false;
      console.log('Form is valid');
      console.log('First Name:', this.firstName);
    } else {
      console.log('Form is invalid');
      this.errorTrue = true;
    }
  }

}
