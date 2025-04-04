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

}
