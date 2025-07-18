import { Component, AfterViewInit } from '@angular/core';
import { TrainerAttendanceComponent } from '../../attendance/trainer-attendance/trainer-attendance.component';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [
    TrainerAttendanceComponent
  ],
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent  {

}
