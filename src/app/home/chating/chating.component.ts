import { Component } from '@angular/core';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';

@Component({
  selector: 'app-chating',
  imports: [ChatSidebarComponent],
  templateUrl: './chating.component.html',
  styleUrl: './chating.component.scss',
})
export class ChatingComponent {
  isChatEnabled: boolean = false;
  isChatSidebarEnabled: boolean = false;

  selectedChat: any = {
    id: 0,
    name: '',
    role: '',
    image: '',
    lastMessage: '',
    lastMessageTime: '',
    unreadMessages: 0,
    messages: [],
  };

  getChatingDetail(event: any) {
    console.log(event);
    this.selectedChat = event;
    this.isChatEnabled = true;

    setTimeout(() => {
      this.addMessage()
    }, 10);
  }

  addMessage() {
    const chatBar = document.querySelector('.chat-messages') as HTMLElement;

    // Scroll to bottom
    chatBar.scrollTop = chatBar.scrollHeight;

    chatBar.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}
