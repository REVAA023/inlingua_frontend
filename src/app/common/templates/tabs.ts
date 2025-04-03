import { NgClass } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  template: `
    @if(isActive) {
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
    }
  `,
})
export class TabComponent {
  @Input() tabTitle: string = '';
  isActive: boolean = false;
}

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="tab-group" [ngClass]="{ 'horizontal': isHorizontal, 'vertical': !isHorizontal }">
      <!-- Tab Titles -->
      <div class="tab-titles">
        @for (tab of tabs; track $index) {
        <div
          class="tab-title"
          [ngClass]="{ 'active': tab.isActive }"
          (click)="selectTab(tab)"
        >
          {{ tab.tabTitle }}
        </div>
        }
      </div>

      <!-- Tab Content -->
      <div class="tab-body border">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TabGroupComponent implements AfterContentInit {
  @Input() isHorizontal: boolean = false;
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @Output() tabChange = new EventEmitter<TabComponent>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterContentInit() {
    Promise.resolve().then(() => {
      const activeTabs = this.tabs.filter(tab => tab.isActive);
      if (activeTabs.length === 0 && this.tabs.first) {
        this.selectTab(this.tabs.first, true);
      }
    });
  }

  selectTab(tab: TabComponent, suppressEmit = false) {
    this.tabs.forEach(t => (t.isActive = false));
    tab.isActive = true;
    if (!suppressEmit) {
      this.tabChange.emit(tab);
    }
  }
}