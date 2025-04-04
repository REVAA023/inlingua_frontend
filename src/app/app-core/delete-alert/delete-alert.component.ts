import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppButton } from '../core-component/core-directives.directive';
import { AppSafePipe } from '../../common/pipes/app-safe/app-safe.pipe';

export interface DialogData {
  msg: string;
  content: string;
  type: string;
  Otherbtn?: boolean;
  otherbtntext: string;
  closeIconHidden: boolean;
}

@Component({
  selector: 'app-delete-alert',
  standalone: true,
  imports: [CommonModule, AppButton, AppSafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './delete-alert.component.html',
  styleUrl: './delete-alert.component.scss',
})
export class DeleteAlertComponent implements OnInit {
  @Input() closeIconHidden = false;
  constructor(public dialogRef: MatDialogRef<DeleteAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.closeIconHidden = data.closeIconHidden;
  }

  ngOnInit(): void { }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  close() {
    this.dialogRef.close(true);
  }
}
