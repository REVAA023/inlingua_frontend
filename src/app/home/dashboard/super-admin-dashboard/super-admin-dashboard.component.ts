import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Chart,
  registerables
} from 'chart.js';
import { AppService } from '../../../app.service';
import { DataService } from '../../../common/services/data/data.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements AfterViewInit {
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(public data: DataService, public appService: AppService) {
    // Register all necessary Chart.js components
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['JAN', 'FEB', 'MAR', 'APL', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Another Data',
              data: [1200, 1500, 2500, 2000, 2200, 2800, 1900, 3000, 3500, 4000, 4500, 5000],
              borderColor: 'rgba(0, 162, 255, 0.5)',
              backgroundColor: 'rgba(214, 240, 255, 0.2)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + 'k';
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      });
    }
  }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
  }
}
