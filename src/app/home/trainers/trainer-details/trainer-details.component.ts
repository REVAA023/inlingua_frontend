import { Component } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';
import { ApiDataService } from '../../../common/api-services/api-data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';
import { TrainerAttendanceComponent } from '../../attendance/trainer-attendance/trainer-attendance.component';

@Component({
  selector: 'app-trainer-details',
  imports: [
    InputControlComponent,
    FormsModule,
    PageLodingComponent,
    TrainerAttendanceComponent
  ],
  templateUrl: './trainer-details.component.html',
  styleUrl: './trainer-details.component.scss'
})
export class TrainerDetailsComponent {

   isLoading = false;
  isEnabled = false;
  trainer: any;
  classRooms: any;
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  constructor(
    private apiService: ApplicationApiService,
    public router: Router,
    public route: ActivatedRoute,
    public urlService: UrlService,
    public data: DataService,
    private url: UrlService
  ) { }

  async ngOnInit(): Promise<void> {
    let paramsId = this.route.snapshot.paramMap.get('trainerid');
    let obj: any = await this.urlService.decode(paramsId);
    console.log("Decoded Trainer ID", obj);

    await this.data.checkToken();
    const payload = {
      trainerid: obj
    }
    this.getTrainerDetails(payload);
  }

  getTrainerDetails(trainerid: any) {
    this.apiService.getTrainerDetails(trainerid).subscribe((response: any) => {
      this.trainer = response.trainer;
      this.classRooms = response.class_rooms;
      console.log("Trainer Details", this.classRooms);

      this.isEnabled = true;
      this.isLoading = true;
    });
  }

  nnavigate(id: any) {
    this.url.encode(id).then((urlJson) => {
      this.router.navigateByUrl('batchs/details/' + urlJson);
    });
  }

  goBack() {
    this.router.navigateByUrl('/trainers');
  }

  editDetails() {
    this.isEnabled = !this.isEnabled;
  }

  deliteDetails() {
    if (confirm('Are you sure you want to delete this trainer?')) {
      // Implement delete functionality
      console.log('Delete trainer:', this.trainer.trainerId);
    }
  }

  onMonthChange(direction: number) {
    this.selectedMonth += direction;

    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    }
  }
}
