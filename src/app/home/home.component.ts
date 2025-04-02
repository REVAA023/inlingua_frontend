import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    SidebarComponent,
    NavbarComponent,
    RouterModule,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
