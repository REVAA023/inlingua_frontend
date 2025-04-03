import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../../../app-core/alert/alert.component';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private dialogRef!: MatDialogRef<any>;
  private readonly dialogClosed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  watchDialogClosed(): Observable<boolean> {
    return this.dialogClosed$.asObservable();
  }

  openDialog<T>(template: any, config: MatDialogConfig): Promise<T | undefined> {
    return new Promise<T | undefined>((resolve, reject) => {
      try {
        this.dialogRef = this.dialog.open<T>(template, config);

        this.dialogRef
          .afterClosed()
          .pipe(finalize(() => this.dialogClosed$.next(true))) 
          .subscribe({
            next: (result: T | undefined) => {
              resolve(result)
            },
            error: (error: any) => reject(error),
          });
      } catch (error) {
        console.error('Error opening dialog:', error);
        reject(error);
      }
    });
  }

  openSuccessSnackbar(message: string, config?: MatSnackBarConfig): void {
    const defaultConfig: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'custom-snackbar'
    };
    const snackConfig = { ...defaultConfig, ...config, data: { msg: message, type: 'success' } };

    this.snackBar.openFromComponent(AlertComponent, snackConfig);
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogClosed$.next(true);
      this.dialogRef.close();
    }
    this.dialog.closeAll();
  }

  openDeleteDialog(
    message: string,
    confirmationText: string,
    items: any[] = []
  ): Promise<boolean> {
    const config = this.getDeleteDialogConfig(message, confirmationText, items);
    return this.openDialog<boolean>(AlertComponent, config).then((result) => {
      return result ?? false;
    });
  }


  openAlertDialog(message: string, panelClass = 'alert-pane'): Promise<void> {
    const config = this.getDialogConfig(panelClass, message, 'alertMsg');
    return this.openDialog<void>(AlertComponent, config);
  }

  openSubmitAlertDialog(message: string): Promise<void> {
    const config = this.getDialogConfig('submit-pane', message, 'submitAlert');
    return this.openDialog<void>(AlertComponent, config);
  }

  openSessionAlertDialog(xMsg: any): Promise<boolean> {
    const config = this.getDialogConfig('session-pane', xMsg, 'sessionAlert');
    return this.openDialog<boolean>(AlertComponent, config).then((result: any) => {
      return result;
    });
  }


  showSuccessMessage(message: string): void {
    this.openSuccessSnackbar(message, {
      panelClass: 'success-snackbar'
    });
  }

  private getDialogConfig(panelClass: string, message: string, type: string): MatDialogConfig {
    return {
      width: '500px',
      disableClose: true,
      panelClass,
      data: {
        msg: message,
        type,
        flag: true
      }
    };
  }

  private getDeleteDialogConfig(
    message: string,
    confirmationText: string,
    items: any[]
  ): MatDialogConfig {
    return {
      width: '100%',
      maxWidth: '376px',
      disableClose: true,
      panelClass: 'delete-pane',
      data: {
        msg: message,
        type: 'delete',
        flag: true,
        confirmationText,
        items
      }
    };
  }

}
