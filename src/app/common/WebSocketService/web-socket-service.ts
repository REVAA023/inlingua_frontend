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

  // Connect to WebSocket
  connect(url?: string): void {
  if (!this.socket$ || this.socket$.closed) {
    const wsUrl = url || 'null'; // must be absolute

    this.socket$ = webSocket({
      url: wsUrl,
      openObserver: {
        next: () => console.log('✅ WebSocket connected')
      },
      closeObserver: {
        next: () => {
          console.log('❌ WebSocket closed');
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


  // Send a message to the server
  sendMessage(message: any): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(message);
    } else {
      console.warn('WebSocket is not connected. Attempting to reconnect...');
      this.connect();
      // Retry sending after connection attempt
      setTimeout(() => {
        if (this.socket$ && !this.socket$.closed) {
          this.socket$.next(message);
        }
      }, 1000);
    }
  }

  // Receive messages from the server
  getMessages(): Observable<any> {
    return this.messagesSubject$.asObservable();
  }

  // Check connection status
  isConnected(): boolean {
    return this.socket$ !== null && !this.socket$.closed;
  }

  // Close the WebSocket connection
  closeConnection(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  // Reconnect
  reconnect(): void {
    this.closeConnection();
    this.connect();
  }
}
