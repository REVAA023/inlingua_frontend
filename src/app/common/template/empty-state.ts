import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="empty-state slot-center p26">
    <div class="m-auto text-center mw250">
        <div class="icon-box"><ion-icon [src]="img"></ion-icon></div>
        <p>{{title}}</p>
        <div class="sub-title">
            {{subtitle}}
        </div>
    </div>
</div>
  `,
})

export class EmptyStateComponent implements OnInit {
  @Input() img = '';
  @Input() title = 'No records found';
  @Input() subtitle = 'Try adjusting your search or filter options to find what you\'re looking for';

  constructor() { }

  ngOnInit(): void {
    if (this.img === '') {
      this.img = 'assets/empty-state/' + (Math.floor(Math.random() * 4) + 1) + '.svg';
    }
  }
}
