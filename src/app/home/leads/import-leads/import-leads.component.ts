import { Component } from '@angular/core';

@Component({
  selector: 'app-import-leads',
  imports: [],
  templateUrl: './import-leads.component.html',
  styleUrl: './import-leads.component.scss',
})
export class ImportLeadsComponent {
  onDragOver(event: DragEvent) {
    event.preventDefault();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.remove('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.remove('drag-over');

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    console.log('Selected file:', file.name);
    // Handle file processing here (upload, validate, etc.)
  }
}
