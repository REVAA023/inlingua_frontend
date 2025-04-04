import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

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
              borderColor: 'rgba(0, 162, 255, 0.5)', // Light Blue
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
              display: false, // Hide legend if not needed
            }
          }
        }
      });
    }
  }
}
