import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private events = [
    {
      name: 'Meeting',
      startDate: '2024-12-05',
      endDate: '2024-12-05',
      type: 'Meeting',
      color: '#007bff'
    }
  ];

  getEvents(): Observable<any[]> {
    return of(this.events);
  }

  getDaysInMonth(month: number, year: number): any[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, events: [] });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayEvents = this.events.filter(event => this.isEventOnDate(event, date));
      days.push({ date, events: dayEvents });
    }

    return days;
  }

  private isEventOnDate(event: any, date: Date): boolean {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return date >= start && date <= end;
  }

  openEventModal(day: any) {
    console.log('Open modal for:', day);
  }
}
