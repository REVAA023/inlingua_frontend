import { Component } from '@angular/core';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';

@Component({
  selector: 'app-chating',
  imports: [
    ChatSidebarComponent
  ],
  templateUrl: './chating.component.html',
  styleUrl: './chating.component.scss'
})
export class ChatingComponent {

}
