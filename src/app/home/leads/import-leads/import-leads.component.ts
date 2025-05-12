import { AppService } from './../../../app.service';
import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FileSelectorComponent } from './../../../app-core/form-input/file-selector/file-selector.component';
import * as Papa from 'papaparse';
import { FormsModule } from '@angular/forms';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-import-leads',
  standalone: true,
  imports: [RouterModule, FileSelectorComponent, FormsModule],
  templateUrl: './import-leads.component.html',
  styleUrl: './import-leads.component.scss',
})
export class ImportLeadsComponent {
  constructor(
    private apiService: ApplicationApiService,
    private changerouter: Router,
    private url: UrlService,
    public appService : AppService
  ) {}

  leadForm: any = null;
  tableHeaders: string[] = [];
  tableData: { row_number: number; values: string[] }[] = [];
  headerOptions: string[] = [
    '',
    'Name',
    'Gmail',
    'Mobile Number',
    'Lead Source'
  ];

  // File Upload Handler
  getDocument(event: any, type?: string) {
    const documentObj = {
      documentName: event.fileName,
      documentSize: event.fileSize,
      documentContant: event.content,
      documentsExtention: event.fileType,
      createdDate: new Date().toISOString()
    };

    if (type === 'LFORM') {
      this.leadForm = documentObj;
      this.parseCSV(event.content);
    }
  }

  // Remove uploaded file
  removeImage(type: string) {
    if (type === 'LFORM') {
      this.leadForm = null;
      this.tableHeaders = [];
      this.tableData = [];
    }
  }

  // CSV Parser with Row Numbers
  parseCSV(csvBase64: string) {
    const decodedCSV = atob(csvBase64.split(',')[1]); // Decode base64
    const parsed = Papa.parse(decodedCSV.trim(), {
      skipEmptyLines: false // Don't skip lines automatically
    });

    if (parsed.data.length > 0) {
      const headers = parsed.data[0] as string[];

      const dataRows: any[] = [];
      for (let i = 1; i < parsed.data.length; i++) {
        const values = parsed.data[i] as string[];

        const isEmptyRow = values.every(cell => cell.trim() === '');
        if (!isEmptyRow) {
          dataRows.push({
            row_number: i + 1, // Preserve original row number (including header)
            values
          });
        }
      }
      this.tableHeaders = headers;
      this.tableData = dataRows;
    }
  }

  // Submit to Backend
  submitLeads() {
    const mappedData = this.tableData.map((row) => {
      const mappedRow: { [key: string]: string | number } = {
        row_number: row.row_number
      };
      this.tableHeaders.forEach((header, index) => {
        if (header && header.trim()) {
          mappedRow[header] = row.values[index] || '';
        }
      });
      return mappedRow;
    });

    const payload = {
      leadSheet: mappedData
    };

    this.apiService.importLeads(payload).subscribe(async (response: any) => {
      this.appService.resultLeadForm = response;
      let filename = await this.url.encode(this.leadForm.documentName);
      this.changerouter.navigateByUrl("leads/import/" + filename)

    });
  }
}
