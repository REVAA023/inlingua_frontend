import { TrainersComponent } from '../trainers/trainers.component';
import { StudentSettingComponent } from './student-setting/student-setting.component';
import { Component } from '@angular/core';
import { SuperAdminSettingComponent } from './super-admin-setting/super-admin-setting.component';
import { TrainerSettingComponent } from './trainer-setting/trainer-setting.component';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-setting',
  imports: [
    StudentSettingComponent,
    TrainerSettingComponent,
    SuperAdminSettingComponent
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  constructor(public appservice: AppService) { }
}
