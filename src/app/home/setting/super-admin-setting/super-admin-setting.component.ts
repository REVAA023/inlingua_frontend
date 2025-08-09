import { Component } from '@angular/core';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { FileSelectorComponent } from '../../../app-core/form-input/file-selector/file-selector.component';
import { Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from '../../../common/services/url/url.service';
import { AlertComponent, DialogData } from '../../../app-core/alert/alert.component';

@Component({
  selector: 'app-super-admin-setting',
  imports: [
    InputControlComponent,
    FileSelectorComponent,
    FormsModule
  ],
  templateUrl: './super-admin-setting.component.html',
  styleUrl: './super-admin-setting.component.scss'
})
export class SuperAdminSettingComponent {

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    public data: DataService,
    private dialog: MatDialog,
    private url: UrlService
  ) { }


  isLoading = false;
  StudyMaterials: any;

  languages: any;
  levelAndHour: any;
  paymentTypeChoices: any;


  StudyMaterialForm = {
    languageId: "",
    courseTypeId: "",
    paymentType: "",
    StudyMaterial: {
      createdDate: "",
      documentContant: "",
      documentName: "",
      documentSize: 0,
      documentsExtention: ""
    }
  };


  errorTrue = false



  async ngOnInit() {
    await this.data.checkToken();
    this.getStudyMaterial()
    this.getLanguage()
    this.getStudentDetailsChoices()
    this.isLoading = true;
  }
  // StudyMaterial
  getStudyMaterial() {
    this.apiService.getStudyMaterial().subscribe((response: any) => {
      this.StudyMaterials = response.study_materials;
    });
  }

  getLanguage() {
    const option = { hideJwt: true };
    this.apiService.getLanguage(option).subscribe((response: any) => {
      this.languages = response.languages;
    });
  }

  getLevelAndHours(Id: any) {
    const obj = { levelId: Id };
    const option = { hideJwt: true };
    this.apiService.getLevelAndHours(obj, option).subscribe((responce: any) => {
      this.levelAndHour = responce.Levelandhours;
      console.log('Level and Hours:', this.levelAndHour);

    });
  }

  getStudentDetailsChoices() {
    const option = { hideJwt: true };
    this.apiService.getStudentDetailsChoices(option).subscribe((response: any) => {
      this.paymentTypeChoices = response.PAYMENT_TYPE_CHOICES;
      console.log('Student Details Choices:', this.paymentTypeChoices);
    });
  }

  getDocument(event: any, type?: string) {
    const documentObj = {
      documentName: event.fileName,
      documentSize: event.fileSize,
      documentContant: event.content,
      documentsExtention: event.fileType,
      createdDate: new Date().toISOString()
    };

    if (type === 'STMRL') {
      this.StudyMaterialForm.StudyMaterial = documentObj;
    }
  }

  removeImage(type: string) {
    const emptyDoc = {
      documentName: '',
      documentSize: 0,
      documentContant: '',
      documentsExtention: '',
      createdDate: ''
    };
    if (type === 'STMRL') {
      this.StudyMaterialForm.StudyMaterial = emptyDoc;
    }
  }

  onSubmit(form: any) {
    if (!form.valid) {
      this.errorTrue = true;
      return;
    }
    if (!this.StudyMaterialForm.StudyMaterial.documentSize) {
      this.dialog.open(AlertComponent, {
        data: <DialogData>{
          msg: 'Please Upload Study Material Document',
          type: 'alertMsg',

          flag: true,
          header: 'Missing Document',
          confirmationText: '',
          closeIconHidden: false,
        },
        disableClose: true,
        hasBackdrop: true
      });
      return;
    }
    else {
      this.apiService.createStudyMaterial(this.StudyMaterialForm).subscribe((response: any) => {
        this.isLoading = false;
        this.getStudyMaterial();
        this.StudyMaterialForm = {
          languageId: "",
          courseTypeId: "",
          paymentType: "",
          StudyMaterial: {
            createdDate: "",
            documentContant: "",
            documentName: "",
            documentSize: 0,
            documentsExtention: ""
          }
        };
        this.errorTrue = false;
      })
    }
  }

}

