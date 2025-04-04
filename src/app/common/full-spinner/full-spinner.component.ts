import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-spinner',
  template: '<div class="p-box pt68"><mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar></div>',
  standalone: true,
  imports: [MatProgressBarModule]
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
