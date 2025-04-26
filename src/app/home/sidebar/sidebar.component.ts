import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../common/services/storage/storage.service';
import { AppService } from '../../app.service';

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
export class SidebarComponent implements OnInit {
  isSidebarClosed = true;

  constructor(
    public storage: StorageService,
    private router: Router,
    public appservice: AppService,
  )
    {}

  async ngOnInit() {
    const sidebarState: any = await this.storage.get('isSidebarClosed');
    if (sidebarState) {
      this.isSidebarClosed = JSON.parse(sidebarState);
    }
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.storage.set('isSidebarClosed', JSON.stringify(this.isSidebarClosed))
  }

  logout() {
    this.storage.clear();
    this.router.navigateByUrl('/login')
  }
}
