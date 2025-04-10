import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-student-dashboard',
  imports: [],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent implements AfterViewInit, OnDestroy {
  percentage = 75;

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['A', 'B'],
        datasets: [
          {
            data: [12, 19],
            borderWidth: 1,
            backgroundColor: ['rgb(255, 181, 121)', 'rgb(253, 161, 86)'],
          },
        ],
      },
      options: {
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#252B42',
            titleColor: '#FFFFFF',
            bodyColor: '#FFFFFF',
            bodyFont: { weight: 'bold' },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}

