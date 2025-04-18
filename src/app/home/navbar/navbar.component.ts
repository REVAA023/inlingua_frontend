import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { DataService } from '../../common/services/data/data.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit {

constructor(public appservice: AppService, public data: DataService) {

}

  async ngOnInit(): Promise<void> {
  await this.data.checkToken();
}

}
