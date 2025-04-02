import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarComponent {
  isSidebarClosed = true;

  constructor() {
    const sidebarState = localStorage.getItem('isSidebarClosed');
    if (sidebarState) {
      this.isSidebarClosed = JSON.parse(sidebarState);
    }
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
    localStorage.setItem('isSidebarClosed', JSON.stringify(this.isSidebarClosed));
  }
}
