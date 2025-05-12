import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router, RouterModule } from '@angular/router';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

@Component({
  selector: 'app-leads-result',
  imports: [
    RouterModule,
    PageLodingComponent
  ],
  templateUrl: './leads-result.component.html',
  styleUrl: './leads-result.component.scss'
})
export class LeadsResultComponent {
  isLoading = false

  realData = [];
  duplicateData = [];
  errorData = []

  tableData = [];
  tableHeaders: string[] = [];

  constructor(
    public appService: AppService,
    private changeUrl: Router
  ) { }

  activeTab = 'success';



  ngOnInit() {
    this.realData = this.appService.resultLeadForm.real_data || [];
    this.duplicateData = this.appService.resultLeadForm.duplicate_data || [];
    this.errorData = this.appService.resultLeadForm.error_data || [];
    this.selectTab('success');
    this.loadPage();
    window.addEventListener("beforeunload", this.beforeUnloadHandler);
  }


  // ngOnDestroy() {
  //   window.removeEventListener("beforeunload", this.beforeUnloadHandler);
  // }

  beforeUnloadHandler(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = 'vhghvhgfghfhg'; // This is required for Chrome
  }

  loadPage() {
    if (this.realData.length == 0 && this.duplicateData.length == 0 && this.errorData.length == 0) {
      this.changeUrl.navigateByUrl('/leads')
    }
    else {
      this.isLoading = true;
    }
  }

  isReloadPage() {

  }

  selectTab(tab: 'success' | 'fail' | 'error') {
    this.activeTab = tab;
    if (tab === 'success') {
      this.tableData = this.realData;
    } else if (tab === 'fail') {
      this.tableData = this.duplicateData;
    }
    else {
      this.tableData = this.errorData;
    }

    // Dynamically get headers from the first item
    if (this.tableData.length > 0) {
      this.tableHeaders = Object.keys(this.tableData[0]);
    } else {
      this.tableHeaders = [];
    }
  }

  goBack() {
    this.changeUrl.navigateByUrl('/leads')
  }


}
