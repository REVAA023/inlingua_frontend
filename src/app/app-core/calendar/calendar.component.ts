import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarService } from '../../common/services/calendar/calendar.service';
import { EventModalComponent } from './event-modal/event-modal.component';
import { MatDialog } from '@angular/material/dialog';

interface CalendarEvent {
  summary: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: string;
  isAllDay: boolean;
}

interface Day {
  date: Date | null;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, EventModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  days: Day[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  events: CalendarEvent[] = [
    {
      summary: 'Team Meeting',
      description: 'Discuss project goals',
      startDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 10),
      endDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 11),
      color: '#007bff',
      isAllDay: false
    },
    {
      summary: 'Project Deadline',
      description: 'Submit project report',
      startDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 3),
      endDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 3),
      color: '#ff6347',
      isAllDay: true
    }
  ];
  monthYear = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    return date.getFullYear() === this.today.getFullYear() &&
      date.getMonth() === this.today.getMonth() &&
      date.getDate() === this.today.getDate();
  }

  generateCalendar(month: number, year: number): void {
    this.monthYear = `${this.monthNames[month]} ${year}`;
    this.days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill blank days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.days.push({ date: null, events: [] });
    }

    // Fill days of the month with events
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayEvents = this.events.filter(event => this.isDateInRange(event, date));
      this.days.push({ date, events: dayEvents });
    }
  }

  isDateInRange(event: CalendarEvent, date: Date): boolean {
    return date >= event.startDate && date <= event.endDate;
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  openEventEditor(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(EventModalComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '600px',
      height: 'auto',
      data: event,
      panelClass: 'event-modal',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the event in your events list
        const index = this.events.findIndex(e => e.summary === event.summary && e.startDate.getTime() === event.startDate.getTime());
        if (index !== -1) {
          this.events[index] = result; // Update with modified event data
        }
      }
    });
  }
}
