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
  leadDetails: any = {};
  isLoading = false;
  isEnabled = true;

  constructor(
    public data: DataService,
    public router : Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    private apiService: ApplicationApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    let paramsId = this.route.snapshot.paramMap.get('id');
    let obj: any = await this.urlService.decode(paramsId);
    const payload ={
      leadId:obj
    }
    this.getLeadDetails(payload);
    this.isLoading = true;
  }

  getLeadDetails(payload: any) {
    this.apiService.getLeadDetails(payload).subscribe((response: any) => {
      this.leadDetails = response.Leads;
    })
  }

  goBack(){}
  editDetails(){}
  deliteDetails(){}

}
