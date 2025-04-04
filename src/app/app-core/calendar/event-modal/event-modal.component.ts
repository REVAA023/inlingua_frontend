import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InputControlComponent } from '../../form-input/input-control/input-control.component';
import { ColorPickerComponent } from '../../color-picker/color-picker.component';

interface CalendarEvent {
  summary: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: string;
  isAllDay: boolean;
}

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [FormsModule, InputControlComponent, MatCheckboxModule, ColorPickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EventModalComponent {
  event: CalendarEvent;
  errorTrue = false;

  constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEvent
  ) {
    this.event = { ...data }; // Clone the data passed to the modal
  }

  onSave(): void {
    this.dialogRef.close(this.event); // Send back the updated event data
  }

  onRemove(): void {
    this.dialogRef.close(null); // Close without saving
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without any action
  }

  colorValue = '#ffcc80';

  colorOptions = [
    { label: 'Orange', value: '#ffcc80' },
    { label: 'Red', value: '#ff8a80' },
    { label: 'Pink', value: '#f48fb1' },
    { label: 'Purple', value: '#ce93d8' },
    { label: 'Blue', value: '#90caf9' },
    { label: 'Cyan', value: '#80deea' },
    { label: 'Green', value: '#a5d6a7' },
    { label: 'Light Green', value: '#c5e1a5' }
  ];

  onColorSelected(event: any): void {
    console.log(event);
    
    console.log('Selected Color:', this.colorValue);
  }
}
