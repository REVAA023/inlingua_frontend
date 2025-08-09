import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-meeting',
  imports: [],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeetingComponent {
users = 5
}
