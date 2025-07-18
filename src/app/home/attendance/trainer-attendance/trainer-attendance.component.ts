import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, TrackByFunction, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLodingComponent } from '../../../app-core/page-loding/page-loding.component';

export interface AttendanceData {
  [date: string]: {
    [timeSlot: string]: number; // 0-4 attendance levels
  };
}

interface CalendarCell {
  day: number;
  timeSlot: string;
  level: number;
  cssClass: string;
  title: string;
}

interface CalendarRow {
  timeSlot: string;
  cells: CalendarCell[];
}

@Component({
  selector: 'app-trainer-attendance',
  standalone: true,
  imports: [
    CommonModule,
    PageLodingComponent
  ],
  templateUrl: './trainer-attendance.component.html',
  styleUrls: ['./trainer-attendance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerAttendanceComponent implements OnInit, OnChanges {
  @Input() trainerId: string = '';
  @Input() selectedMonth: number = new Date().getMonth();
  @Input() selectedYear: number = new Date().getFullYear();

  isLoading = true;

  readonly timeSlots = [
    '9 AM - 10 AM',
    '10 AM - 11 AM',
    '11 AM - 12 PM',
    '12 PM - 1 PM',
    '1 PM - 2 PM',
    '2 PM - 3 PM',
    '3 PM - 4 PM',
    '4 PM - 5 PM',
    '5 PM - 6 PM'
  ] as const;

  readonly monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ] as const;

  readonly attendanceTexts = {
    0: 'No attendance',
    1: 'Low attendance',
    2: 'Normal attendance',
    3: 'High attendance',
    4: 'Full attendance'
  } as const;

  readonly attendanceClasses = {
    0: 'level-0',
    1: 'level-1',
    2: 'level-2',
    3: 'level-3',
    4: 'level-4'
  } as const;

  attendanceData: AttendanceData = {};
  daysInMonth: number[] = [];
  monthName: string = '';
  calendarRows: CalendarRow[] = [];

  // Track by functions for better performance
  trackByDay: TrackByFunction<number> = (index: number, day: number) => day;
  trackByTimeSlot: TrackByFunction<CalendarRow> = (index: number, row: CalendarRow) => row.timeSlot;
  trackByCell: TrackByFunction<CalendarCell> = (index: number, cell: CalendarCell) => `${cell.day}-${cell.timeSlot}`;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedMonth'] || changes['selectedYear'] || changes['trainerId']) {
      this.initializeComponent();
    }
  }

  private async initializeComponent() {
    this.setLoading(true);
    this.generateCalendarData();
    await this.loadAttendanceData();
    this.setLoading(false);
  }

  private generateCalendarData() {
    const daysCount = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
    this.monthName = this.monthNames[this.selectedMonth];
  }

  private buildCalendarRows() {
    this.calendarRows = this.timeSlots.map(timeSlot => ({
      timeSlot,
      cells: this.daysInMonth.map(day => {
        const level = this.getAttendanceLevel(day, timeSlot);
        return {
          day,
          timeSlot,
          level,
          cssClass: this.attendanceClasses[level as keyof typeof this.attendanceClasses],
          title: `Day ${day} - ${timeSlot}: ${this.attendanceTexts[level as keyof typeof this.attendanceTexts]}`
        };
      })
    }));
  }

  private async loadAttendanceData() {
    try {
      // Simulate API call delay
      await this.delay(500);

      // Generate mock data - replace with actual API call
      // this.attendanceData = this.generateMockData();
      this.buildCalendarRows();
    } catch (error) {
      console.error('Error loading attendance data:', error);
      // Handle error appropriately
    }
  }

  // private generateMockData(): AttendanceData {
  //   const data: AttendanceData = {};
  //   const monthPadded = String(this.selectedMonth + 1).padStart(2, '0');

  //   this.daysInMonth.forEach(day => {
  //     const dateKey = `${this.selectedYear}-${monthPadded}-${String(day).padStart(2, '0')}`;
  //     const dayData: { [timeSlot: string]: number } = {};

  //     this.timeSlots.forEach(timeSlot => {
  //       // Generate random attendance levels (0-4) with better distribution
  //       const random = Math.random();
  //       let level = 0;

  //       if (random > 0.8) level = 4;
  //       else if (random > 0.6) level = 3;
  //       else if (random > 0.4) level = 2;
  //       else if (random > 0.2) level = 1;
  //       else level = 0;

  //       dayData[timeSlot] = level;
  //     });

  //     data[dateKey] = dayData;
  //   });

  //   return data;
  // }

  private getAttendanceLevel(day: number, timeSlot: string): number {
    const dateKey = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.attendanceData[dateKey]?.[timeSlot] || 0;
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
    this.cdr.markForCheck();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCellClick(cell: CalendarCell) {
    const dateKey = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

    console.log(`Date: ${dateKey}, Time: ${cell.timeSlot}, Level: ${cell.level}`);

    // You can implement a modal or detailed view here
    // this.openAttendanceDetail(dateKey, cell.timeSlot, cell.level);
  }

  async changeMonth(direction: number) {
    this.selectedMonth += direction;

    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    }

    await this.initializeComponent();
  }

  // Method to be called from parent component when data needs to be refreshed
  async refreshAttendanceData() {
    await this.loadAttendanceData();
  }
}
