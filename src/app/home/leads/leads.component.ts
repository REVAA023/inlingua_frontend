import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputControlComponent } from '../../app-core/form-input/input-control/input-control.component';

@Component({
  selector: 'app-leads',
  imports: [
    RouterModule,
    InputControlComponent
  ],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {

}
