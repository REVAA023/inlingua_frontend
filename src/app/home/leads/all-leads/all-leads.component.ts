import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

@Component({
  selector: 'app-all-leads',
  imports: [
    InputControlComponent,
    PageLodingComponent
  ],
  templateUrl: './all-leads.component.html',
  styleUrl: './all-leads.component.scss'
})
export class AllLeadsComponent implements OnInit {
  isLoading = false;
  leads: any= {}

  constructor(
    private router: Router,
    private apiService : ApplicationApiService,
    public data: DataService,
    private url: UrlService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    this.getLeads()
  }

  getLeads() {
    this.apiService.getLeads().subscribe((response: any) => {
      this.leads = response.Leads;
      this.isLoading = true;
    })
  }

  async navigate(id: any) {
    let urlJson = await this.url.encode(id);
    this.router.navigateByUrl("leads/details/" + urlJson)
  }

}

