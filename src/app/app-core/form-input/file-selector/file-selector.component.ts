import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  Signal,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
  Renderer2,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { StorageService } from '../../../common/services/storage/storage.service';
import { DataService } from '../../../common/services/data/data.service';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';

@Component({
  selector: 'app-file-selector',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent {
  fileName = '';
  fileSize: any;
  fileFormat = '';
  tempFile: any = {
    fileName: '',
    fileSize: 0,
    fileSizeKb: 0,
    fileType: '',
    uploading: false,
    completed: false,
    content: '',
  };

  private dropzone!: ElementRef;
  @ViewChild('dropzone', { static: false }) set content(content: ElementRef) {

    this.dropzone = content;
  }

  @Input() src = '';
  @Input() icon = '';
  @Input() type = '';
  @Input() label = '';
  @Input() sizeLabel = '';
  @Input() typeLabel = '';
  @Input() public fileSizeLimit = 2;

  @Input() public accept =
    'image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/*,application/pdf';
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('nativeFileUpload', { static: false })
  nativeFileUpload!: ElementRef;

  __document: any;
  @Input() set document(document: any) {
    this.__document = document;
    this.fileName = this.__document.ientFile.fileName;
    this.fileSize = this.__document.ientFile.fileSize;
    this.fileFormat = this.__document.ientFile.fileExtension;
  }
  get document() {
    return this.__document;
  }
  __documentList: any;
  @Input() set documentList(documentList: any) {
    this.__documentList = documentList;
  }
  get documentList() {
    return this.__documentList;
  }

  __btnCondition: any = true;
  @Input() set btnCondition(btnCondition: any) {
    this.__btnCondition = btnCondition;
  }
  get btnCondition() {
    return this.__btnCondition;
  }
  __isMultiple: any = false;
  @Input() set isMultiple(isMultiple: any) {
    this.__isMultiple = isMultiple;
  }
  get isMultiple() {
    return this.__isMultiple;
  }

  @Input() public fileSizeError = '';
  @Input() public fileTypeError = '';
  sizeErrorFlag = false;
  @Input() public deleteId = 0;
  @Input() public pageAccess = '';
  @Input() public docViewAccess = '';
  @Input() public docDeleteAccess = '';
  @Input() public docDownloadAccess = '';
  @Input() public docUploadAccess = '';
  @Input() public ErrorMsg = '';

  pageId = this.pageAccess;
  filePath: any;

  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;

  @Output('onUpload') onUpload: EventEmitter<any> = new EventEmitter();
  @Output('onDelete') onDelete: EventEmitter<any> = new EventEmitter();

  uploadDisabled = false;
  files: Array<any> = [];

  constructor(
    public storage: StorageService,
    public renderer: Renderer2,
    public data: DataService,
    public appSetting: AppSettingsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.setDropZone();
  }

  public initializeTempFile(documentValue: any) {
    const documentFile = documentValue.ientDocumentFile;
    this.tempFile = {
      fileName: documentFile.documentFileName,
      content: documentFile.fileContent,
      fileType: documentFile.documentType,
      fileSize: documentFile.documentSize,
    };
  }

  isDragging: any;

  setDropZone() {
    if (this.dropzone) {
      this.setupDropzoneListeners();
    } else {
      setTimeout(() => this.setDropZone(), 400); // Retry after 400ms if dropzone is not initialized
    }
  }

  private setupDropzoneListeners() {

    const dropzoneElement = this.dropzone.nativeElement;

    ['dragenter', 'dragleave', 'dragover'].forEach((eventType) => {
      this.renderer.listen(dropzoneElement, eventType, (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (eventType === 'dragenter' || eventType === 'dragover') {
          this.renderer.addClass(dropzoneElement, 'entered');
        } else {
          this.renderer.removeClass(dropzoneElement, 'entered');
        }
      });
    });

    this.renderer.listen(dropzoneElement, 'drop', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (this.__isMultiple) {
        this.dropFileUploadMulti(event);
      } else {
        this.dropFileUpload(event);
      }
    });

  }

  // Single File Upload
  async dropFileUpload(event: any) {
    const file = event.dataTransfer.files[0];
    this.processSingleFile(file);
  }


  private processSingleFile(file: File) {

    const regex = /[^\x00-\x7F]/;
    let hasOtherLanguage = regex.test(file.name);

    if (hasOtherLanguage) {
      this.fileSizeError = this.appSetting.environment.uploadFilenameValidateErr;
      this.sizeErrorFlag = true;
      this.fileInput.nativeElement.value = '';
      return;
    }
    this.tempFile = {
      fileName: '',
      fileSize: 0,
      fileSizeKb: 0,
      fileType: '',
      uploading: false,
      completed: false,
      content: '',
    };
    this.fileName = '';
    this.fileSize = '';
    this.sizeErrorFlag = false;

    if (file) {

      // if (
      //   [this.accept].some((type) => file.type.match(type))
      // ) {
      this.tempFile = {
        fileName: file.name,
        fileSize: file.size,
        fileSizeKb: Math.round(file.size / 1024), // Calculate file size in KB
        fileType: file.type,
        uploading: false,
        completed: false,
        content: '',
      };
      this.fileName = file.name;
      this.fileSize = file.size;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      ;
      reader.onload = () => {
        const img: any = reader.result;
        this.tempFile.content = img;
        this.uploadDisabled = false;
        if (this.tempFile.fileName !== '') {
          this.fileInput.nativeElement.value = '';
          this.onUpload.emit(this.tempFile);
        }

      };
      reader.onerror = (error) => { };
      // } else {
      //   this.fileInput.nativeElement.value = '';

      // }
    }
  }

  // Multiple File Upload
  async dropFileUploadMulti(event: any) {
    this.processMultipleFiles(event.dataTransfer.files);
  }

  async loadImageFromDeviceMulti(event: any) {
    if (this.__isMultiple) {
      this.processMultipleFiles(event.target.files);
    } else {
      const file = event.target?.files[0];
      this.processSingleFile(file);
    }

  }

  private async processMultipleFiles(files: FileList) {

    this.files = [];
    const filePromises = Array.from(files).map((file) => {
      const regex = /[^\x00-\x7F]/;
      let hasOtherLanguage = regex.test(file.name);

      if (hasOtherLanguage) {
        this.fileInput.nativeElement.value = '';
        return;
      }
      return new Promise<void>(async (resolve, reject) => {
        if (file.size / 1024 / 1024 <= this.fileSizeLimit) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.tempFile = {
              fileName: file.name,
              fileSize: file.size,
              fileSizeKb: Math.round(file.size / 1024),
              fileType: file.type,
              uploading: false,
              completed: false,
              content: reader.result as string,
            };
            this.fileInput.nativeElement.value = '';
            this.files.push(this.tempFile);
            resolve();
          };
          reader.onerror = (error) => {
            console.error('File read error: ', error);
            reject(error);
          };
        }

      });
    });

    await Promise.all(filePromises);
    this.fileInput.nativeElement.value = '';
    this.onUpload.emit(this.files);
  }

  deleteDocument() {
    this.sizeErrorFlag = false;
    this.fileInput.nativeElement.value = '';
    this.tempFile = {
      fileName: '',
      fileSize: 0,
      fileSizeKb: 0,
      fileType: '',
      uploading: false,
      completed: false,
      content: '',
    };
    this.onDelete.emit(this.tempFile);
  }

  triggerClick() {
    this.nativeFileUpload.nativeElement.click();
  }

  doUpload() {
    if (this.tempFile.fileName && this.tempFile.fileName !== '') {
      this.onUpload.emit(this.tempFile);
    }
  }

  doClearUpload() {
    this.fileInput.nativeElement.value = '';
    this.fileName = '';
    this.fileSize = '';
    this.fileFormat = '';
  }

  openPDFViewer(xurl: any) {
    // const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
    //   width: '90%',
    //   height: '85%',
    //   data: {
    //     url: xurl,
    //   },
    // });
  }

  download() {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.filePath;
    downloadLink.download = this.fileName;
    downloadLink.click();
  }

  imageView(path: any, filename: any) {
    this.filePath = path;
    this.fileName = filename;
    // this.dialog.openDialog(this.Templates, {
    //   id: 'img',
    //   width: '600px',
    //   height: 'auto',
    // });
  }

  close(id: any) {
    // this.dialog.closeDialog(id);
  }
}
