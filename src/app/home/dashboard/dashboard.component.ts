import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data/data.service';
import { AppService } from '../../app.service';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    StudentDashboardComponent,
    TrainerDashboardComponent,
    SuperAdminDashboardComponent
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public data: DataService, public appService: AppService) {
  }
  async ngOnInit(): Promise<void> {
    await this.data.checkToken();

  }
}
