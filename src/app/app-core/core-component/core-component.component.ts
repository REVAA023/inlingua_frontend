import { Component, Input } from '@angular/core';

@Component({
  selector: 'scroll',
  standalone: true,
  imports: [],
  template: '<div class="ab"><div class="rel"><ng-content></ng-content></div></div>',
})
export class InnerScroll {

}

@Component({
  selector: 'row',
  standalone: true,
  imports: [],
  template: '<div class="row-container {{className}}"><div class="row {{rowClass}}" ><ng-content></ng-content></div></div>',
})
export class Row {
  @Input('className') className = "";
  @Input('rowClass') rowClass = "";
}



