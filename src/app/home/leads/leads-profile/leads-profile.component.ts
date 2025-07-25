import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';

@Component({
  selector: 'app-leads-profile',
  imports: [
    FormsModule,
    PageLodingComponent,
    InputControlComponent,
  ],
  templateUrl: './leads-profile.component.html',
  styleUrl: './leads-profile.component.scss'
})
export class LeadsProfileComponent implements OnInit {

  leadDetail: any = {};
  LeadStatus: any = [];
  isLoading = false;
  isEnabled = true;

  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService,
  ) { }

  leadId: any;

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    const leadpayload = {
      leadId: obj
    }
    this.getLeadDetails(leadpayload);
    this.getLeadStatus();
    this.isLoading = true;
  }

  getLeadDetails(payload: any) {
    this.apiService.getLeadDetails(payload).subscribe((response: any) => {
      this.leadDetail = response.Leads;
      console.log('Lead Details', this.leadDetail);
    })
  }

  getLeadStatus() {
    this.apiService.getLeadStatus().subscribe((response: any) => {
      this.LeadStatus = response.lead_status_choices;
    })
  }

  changeStatus(status: any) {
    let payload = {
      leadId: this.leadDetail.id,
      status: status
    }

    this.apiService.changeLeadStatus(payload).subscribe((response: any) => {
      this.getLeadDetails({ leadId: this.leadDetail.id });
      this.data.successMessage('Lead Status Updated Successfully');
    })
  }

  goBack() {
    this.router.navigateByUrl('leads')
  }

  editDetails() {
    this.isEnabled = false;
  }

  deliteDetails() {
    // Add delete functionality here
  }

  getWhatsAppLink(): string {
    const currentTime = new Date().getHours();
    let greeting = '';

    if (currentTime < 12) {
      greeting = 'Good morning';
    } else if (currentTime < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    const message = `Hi ${this.leadDetail.leadName}, ${greeting} from Inlingua Language Center!
    You showed interest to learn another language. Congratulations!
    Please register using the Inlingua register form: ${window.location.origin}/register-form`;

    return `https://wa.me/91${this.leadDetail.leadMobileNumber}?text=${encodeURIComponent(message)}`;
  }

  onSubmit(form: any) {
    if (!form.valid) {
      return;
    } else {
      const payload = {
        leadid: this.leadDetail.id,
        leadName: this.leadDetail.leadName,
        leadEmail: this.leadDetail.leadEmail,
        leadMobileNumber: this.leadDetail.leadMobileNumber,
        leadSource: this.leadDetail.leadSource,
        callbackDate: this.leadDetail.callbackDate,
        remark: this.leadDetail.leadRemark,
        counselorRemark: this.leadDetail.counselorRemark
      }
      this.apiService.updateLeadDetails(payload).subscribe((response: any) => {
        this.isEnabled = true;

        this.getLeadDetails({ leadId: this.leadDetail.id });
        this.data.successMessage('Lead Updated Successfully');
      })
    }
  }
}
