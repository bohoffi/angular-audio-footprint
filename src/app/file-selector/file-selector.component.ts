import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent {

  private _selectedFiles: FileList;

  @Output()
  audioFile = new EventEmitter();

  onChange(event) {
    this._selectedFiles = event.srcElement.files;
  }

  select(): void {
    if (this._selectedFiles && this._selectedFiles.length) {
      this.audioFile.emit(this._selectedFiles.item(0));
    }
  }
}
