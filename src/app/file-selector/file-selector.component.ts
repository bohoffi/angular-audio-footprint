import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent {

  file: File;
  hasDropZoneOver: boolean = false;

  @ViewChild('selector')
  fileInput: ElementRef;

  @Output()
  audioFile = new EventEmitter();

  onChange(event) {
    if (event.srcElement.files && event.srcElement.files.length) {
      this.file = event.srcElement.files.item(0);
      this.audioFile.emit(this.file);
    }
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }

  fileDropped(droppedFiles: FileList): void {
    this.fileInput.nativeElement.files = droppedFiles;
  }

  /**
   * Trigger file selction.
   */
  select(): void {
    this.fileInput.nativeElement.click();
  }
}
