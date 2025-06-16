import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-counselors',
  imports: [
    InputControlComponent,
    FormsModule,
    FileSelectorComponent
  ],
  templateUrl: './create-counselors.component.html',
  styleUrl: './create-counselors.component.scss'
})
export class CreateCounselorsComponent {

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
  ) { }
  errorTrue = false;


  firstName = '';
  lastName = '';
  email = '';
  mobileNumber = '';
  dateofbirth = '';

  counselorPhoto = {
    documentName: '',
    documentSize: '',
    documentContant: '',
    documentsExtention: '',
    createdDate: ''
  };

  getDocument(event: any, type?: string) {
    const documentObj = {
      documentName: event.fileName,
      documentSize: event.fileSize,
      documentContant: event.content,
      documentsExtention: event.fileType,
      createdDate: new Date().toISOString()
    };

    if (type === 'CUSIMG') {
      this.counselorPhoto = documentObj;
    }
  }

  removeImage(type: string) {
    const emptyDoc = {
      documentName: '',
      documentSize: '',
      documentContant: '',
      documentsExtention: '',
      createdDate: ''
    };
    if (type === 'CUSIMG') this.counselorPhoto = emptyDoc;
  }

  onSubmit(form: any) {
    if (!form.valid) {
      this.errorTrue = true;
      return;
    }
    else{
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobileNumber: this.mobileNumber,
        dateofbirth: this.dateofbirth,
        counselorPhoto: this.counselorPhoto
      }

      this.apiService.createCounselor(payload).subscribe((response: any) => {
        this.router.navigate(['counselors']);
      })
    }
  }

}
