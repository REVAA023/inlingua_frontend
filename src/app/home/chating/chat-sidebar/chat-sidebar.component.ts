import { NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-sidebar',
  imports: [NgClass],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.scss',
})
export class ChatSidebarComponent implements OnInit {

  chatConfig = "";

  items: any = [
    {
      id: 1,
      name: 'Sam Kumar',
      email: 'samkumar@gmail.com',
      role: 'Trainer',
      image: 'assets/images/user1.png',
      lastMessage:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero deserunt ipsa placeat fugiat. Veritatis, fugiat distinctio! Temporibus cum, debitis suscipit, beatae laudantium expedita officiis voluptate recusandae placeat provident animi!',
      lastMessageTime: '10:30 AM',
      unreadMessages: 0,
      messages: [
        {
          id: 1,
          auther: 'Sam Kumar',
          message: 'Hello',
          time: '10:30 AM',
          replayId: 0,
        },
        { id: 2, auther: 'You', message: 'Hi', time: '10:30 AM', replayId: 1 },

      ],
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      email: 'ravi@gmail.com',
      role: 'Student',
      image: 'assets/images/user1.png',
      lastMessage:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero deserunt ipsa placeat fugiat. Veritatis, fugiat distinctio! Temporibus cum, debitis suscipit, beatae laudantium expedita officiis voluptate recusandae placeat provident animi!',
      lastMessageTime: '10:35 AM',
      unreadMessages: 2,
      messages: [],
    },
    {
      id: 3,
      name: 'Allwin',
      email: 'allwin@gmail.com',
      role: 'Student',
      image: 'assets/images/user1.png',
      lastMessage:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero deserunt ipsa placeat fugiat. Veritatis, fugiat distinctio! Temporibus cum, debitis suscipit, beatae laudantium expedita officiis voluptate recusandae placeat provident animi!',
      lastMessageTime: '10:40 AM',
      unreadMessages: 0,
      messages: [],
    },
    {
      id: 4,
      name: 'Raabin',
      email: 'raabin@gmail.com',
      role: 'Student',
      image: 'assets/images/user1.png',
      lastMessage:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero deserunt ipsa placeat fugiat. Veritatis, fugiat distinctio! Temporibus cum, debitis suscipit, beatae laudantium expedita officiis voluptate recusandae placeat provident animi!',
      lastMessageTime: '10:45 AM',
      unreadMessages: 3,
      messages: [],
    },
    {
      id: 5,
      name: 'Sathish',
      email: 'sathish@gmail.com',
      role: 'Student',
      image: 'assets/images/user1.png',
      lastMessage:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero deserunt ipsa placeat fugiat. Veritatis, fugiat distinctio! Temporibus cum, debitis suscipit, beatae laudantium expedita officiis voluptate recusandae placeat provident animi!',
      lastMessageTime: '10:50 AM',
      unreadMessages: 8,
      messages: [],
    },
    {
      id: 6,
      name: 'Annatha',
      email: 'annatha@gmail.com',
      role: 'Student',
      image: 'assets/images/user1.png',
      lastMessage:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero deserunt ipsa placeat fugiat. Veritatis, fugiat distinctio! Temporibus cum, debitis suscipit, beatae laudantium expedita officiis voluptate recusandae placeat provident animi!',
      lastMessageTime: '10:29 AM',
      unreadMessages: 100,
      messages: [],
    },
  ];

  @Output() onClick = new EventEmitter<any>();

  constructor() {}
  onChatClick(user: any) {
    console.log(user);
    this.chatConfig = user.email;
    this.onClick.emit(user);
    this.items.forEach((item: any) => {
      if (item.id == user.id) {
        item.unreadMessages = 0;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.items);
  }
}
