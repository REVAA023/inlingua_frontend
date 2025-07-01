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
    InputControlComponent
  ],
  templateUrl: './leads-profile.component.html',
  styleUrl: './leads-profile.component.scss'
})
export class LeadsProfileComponent implements OnInit {
  encodeURIComponent(arg0: string) {
    throw new Error('Method not implemented.');
  }
  leadDetail: any = {};
  LeadStatus: any = [];
  isLoading = false;
  isEnabled = true;

  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService
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
      console.log('Lead Status', this.LeadStatus);

    })
  }

  changeStatus(status: any) {
    let payload = {
      leadId: this.leadDetail.id,
      status: status
    }

    this.apiService.changeLeadStatus(payload).subscribe((response: any) => {
      this.getLeadDetails({leadId: this.leadDetail.id});
    })

  }

  goBack() {
    this.router.navigateByUrl('leads')
  }
  editDetails() {
    this.isEnabled = false;
  }

  deliteDetails() { }

  onSubmit(form: any) {
    if (!form.valid) {
      return;
    }
    else {
      const payload = {
        leadid: this.leadDetail.id,
        leadName: this.leadDetail.leadName,
        leadEmail: this.leadDetail.leadEmail,
        leadMobileNumber: this.leadDetail.leadMobileNumber,
        leadSource: this.leadDetail.leadSource,
        callbackDate: this.leadDetail.callbackDate,
        remark: this.leadDetail.remark,
        counselorRemark: this.leadDetail.counselorRemark
      }
      this.apiService.updateLeadDetails(payload).subscribe((response: any) => {
        this.isEnabled = true;
        this.getLeadDetails({ leadId: this.leadDetail.id });
    })
    }
  }

}
