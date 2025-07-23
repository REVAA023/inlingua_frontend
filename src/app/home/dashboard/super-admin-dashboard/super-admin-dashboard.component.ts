import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppService } from '../../../app.service';
import { DataService } from '../../../common/services/data/data.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(public data: DataService, public appService: AppService) {
    // Register all necessary Chart.js components
    Chart.register(...registerables);
  }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();
  }

  ngAfterViewInit(): void {
    // Add a small delay to ensure the canvas is rendered
    setTimeout(() => {
      this.renderChart();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up the chart to prevent memory leaks
    if (this.chart) {
      this.chart.destroy();
    }
  }

  renderChart(): void {
    if (!this.chartRef?.nativeElement) {
      console.error('Chart canvas element not found');
      return;
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas');
      return;
    }

    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    try {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: 'Contacts Created',
              data: [1200, 1500, 2500, 2000, 2200, 2800, 1900, 3000, 3500, 4000, 4500, 5000],
              borderColor: 'rgba(13, 110, 253, 1)', // Bootstrap primary blue
              backgroundColor: 'rgba(13, 110, 253, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: 'rgba(13, 110, 253, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                },
                color: '#6c757d'
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                callback: function(value: any) {
                  return (value / 1000).toFixed(0) + 'k';
                },
                font: {
                  size: 12
                },
                color: '#6c757d'
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                title: function(context: any) {
                  return context[0].label;
                },
                label: function(context: any) {
                  return `Contacts: ${context.parsed.y.toLocaleString()}`;
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }
}
