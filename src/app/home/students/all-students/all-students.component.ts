import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';

@Component({
  selector: 'app-all-students',
  imports: [
    InputControlComponent,
  ],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent {

}
