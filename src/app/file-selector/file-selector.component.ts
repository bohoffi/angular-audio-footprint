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
    const target = event.target || event.srcElement;
    if (target && target.files && target.files.length) {
      this.file = target.files.item(0);
      this.audioFile.emit(this.file);
    }
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }

  fileDropped(droppedFiles: FileList): void {
    this.file = droppedFiles.item(0);
    this.audioFile.emit(this.file);
  }

  /**
   * Trigger file selction.
   */
  select(): void {
    this.fileInput.nativeElement.click();
  }
}
