import { Component, OnInit } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { AppService } from '../../../app.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-student-dashboard',
  imports: [],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent implements OnInit {
  constructor(
    public data: DataService,
    public appService: AppService,
    private apiService: ApplicationApiService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  percentage = 75;
  studentDetails: any;
  today!: string;

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
    console.log( this.appService.user.userRole);
    this.setToday();
    this.getStudentDetails();
  }

  setToday(): void {
    const date = new Date();

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const dayName = date.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    this.today = `${formattedDate} | ${dayName}`;
    console.log(this.today);
  }

  getStudentDetails(): void {
    const payload = {
      studentId: this.appService.user
    };
    this.apiService.getStudent(payload).subscribe((response: any) => {
      this.studentDetails = response.student;
      console.log('Student Details:', this.studentDetails);

    });
  }

  // @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  // chart!: Chart;

  // ngAfterViewInit(): void {
  //   this.chart = new Chart(this.barCanvas.nativeElement, {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['A', 'B'],
  //       datasets: [
  //         {
  //           data: [12, 19],
  //           borderWidth: 1,
  //           backgroundColor: ['rgb(255, 181, 121)', 'rgb(253, 161, 86)'],
  //         },
  //       ],
  //     },
  //     options: {
  //       cutout: '60%',
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //         tooltip: {
  //           backgroundColor: '#252B42',
  //           titleColor: '#FFFFFF',
  //           bodyColor: '#FFFFFF',
  //           bodyFont: { weight: 'bold' },
  //         },
  //       },
  //     },
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.chart) {
  //     this.chart.destroy();
  //   }
  // }
}

