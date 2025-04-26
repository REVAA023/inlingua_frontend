import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent  {

  ngOnInit(): void {
    this.trainerActivity()
  }
  trainerActivity() {
    const calendar = document.getElementById("calendar");

    if (!calendar ) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthName = now.toLocaleString("default", { month: "long" });

    const startHour = 9;
    const endHour = 18;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // First column: Hour labels
    const hourColumn = document.createElement("div");
    hourColumn.className = "hour-name-column";

    // Empty top cell to align with headers
    const emptyHeader = document.createElement("div");
    emptyHeader.className = "day-header";
    emptyHeader.textContent = "";
    hourColumn.appendChild(emptyHeader);

    for (let hour = startHour; hour < endHour; hour++) {
      const timeLabel = document.createElement("div");
      timeLabel.className = "time-label";

      const hourStart12 = hour > 12 ? hour - 12 : hour;
      const hourEnd12 = hour + 1 > 12 ? hour + 1 - 12 : hour + 1;
      const ampmStart = hour >= 12 ? "PM" : "AM";
      const ampmEnd = (hour + 1) >= 12 ? "PM" : "AM";

      timeLabel.textContent = `${hourStart12} ${ampmStart} - ${hourEnd12} ${ampmEnd}`;
      hourColumn.appendChild(timeLabel);
    }

    calendar.appendChild(hourColumn);

    // Day columns
    for (let day = 1; day <= daysInMonth; day++) {
      const dayColumn = document.createElement("div");
      dayColumn.className = "day-column";

      const dateStr = `${String(day).padStart(2, "0")}`;
      const dayHeader = document.createElement("div");
      dayHeader.className = "day-header";
      dayHeader.innerText = dateStr;
      dayColumn.appendChild(dayHeader);

      for (let hour = startHour; hour < endHour; hour++) {
        const timeSlot = document.createElement("div");
        timeSlot.className = "time-slot";

        const hourStart12 = hour > 12 ? hour - 12 : hour;
        const hourEnd12 = hour + 1 > 12 ? hour + 1 - 12 : hour + 1;
        const ampmStart = hour >= 12 ? "PM" : "AM";
        const ampmEnd = (hour + 1) >= 12 ? "PM" : "AM";

        const tooltipText = `${hourStart12}:00 ${ampmStart} - ${hourEnd12}:00 ${ampmEnd} | ${dateStr}`;
        timeSlot.setAttribute("data-tooltip", tooltipText);

        dayColumn.appendChild(timeSlot);
      }

      calendar.appendChild(dayColumn);
    }
  }

}
