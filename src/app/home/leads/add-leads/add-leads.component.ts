import { FormsModule } from '@angular/forms';
import { InputControlComponent } from './../../../app-core/form-input/input-control/input-control.component';
import { Component } from '@angular/core';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-leads',
  imports: [
    InputControlComponent,
    FormsModule
  ],
  templateUrl: './add-leads.component.html',
  styleUrl: './add-leads.component.scss'
})
export class AddLeadsComponent {

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
  ) { }

  leadName = '';
  leadmail = '';
  leadnumber = '';
  leadSouce = '';

  errorTrue = false;


   onSubmit(form: any) {
    if (!form.valid) {
      this.errorTrue = true;
      return;
    }
    else {
      const payload = {
        leadName: this.leadName,
        leadmail: this.leadmail,
        leadnumber: this.leadnumber,
        leadSouce: this.leadSouce
      }

      this.apiService.createSingleLead(payload).subscribe((response: any) => {
        this.router.navigate(['leads']);
      })
    }
  }
}
