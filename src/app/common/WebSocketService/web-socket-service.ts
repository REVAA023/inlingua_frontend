import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject$ = new Subject<any>();

  constructor() {}

  // Connect to WebSocket with dynamic room
  connect(roomName: string, url?: string): void {
    if (!this.socket$ || this.socket$.closed) {
      const wsUrl = url || `ws://localhost:8000/meeting/${roomName}/`;

      this.socket$ = webSocket({
        url: wsUrl,
        openObserver: {
          next: () => console.log(`✅ Connected to room: ${roomName}`)
        },
        closeObserver: {
          next: () => {
            console.log(`❌ Disconnected from room: ${roomName}`);
            this.socket$ = null;
          }
        }
      });

      this.socket$.subscribe({
        next: msg => {
          console.log('📩 Message received:', msg);
          this.messagesSubject$.next(msg);
        },
        error: err => console.error('⚠️ WebSocket error:', err)
      });
    }
  }

  // Special helper for classroom updates
  connectClassroomUpdates(): void {
    this.connect('classroom', 'ws://localhost:8000/ws/classroom/');
  }

  // Send message
  sendMessage(message: any): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(message);
    } else {
      console.warn('WebSocket is not connected.');
    }
  }

  // Receive messages
  getMessages(): Observable<any> {
    return this.messagesSubject$.asObservable();
  }

  // Close connection
  closeConnection(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }
}
