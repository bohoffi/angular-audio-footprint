import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appFiledrop]'
})
export class FiledropDirective {

  protected element: ElementRef;

  @Output() 
  fileOver:EventEmitter<any> = new EventEmitter();
  @Output() 
  onFileDrop:EventEmitter<File[]> = new EventEmitter<File[]>();

  public constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    let transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    }

    this._preventAndStop(event);
    this.fileOver.emit(false);
    this.onFileDrop.emit(transfer.files);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any): void {
    let transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }

    transfer.dropEffect = 'copy';
    this._preventAndStop(event);
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): any {
    if ((this as any).element) {
      if (event.currentTarget === (this as any).element[0]) {
        return;
      }
    }

    this._preventAndStop(event);
    this.fileOver.emit(false);
  }

  protected _getTransfer(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  protected _preventAndStop(event: any): any {
    event.preventDefault();
    event.stopPropagation();
  }

  protected _haveFiles(types: any): any {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    } else if (types.contains) {
      return types.contains('Files');
    } else {
      return false;
    }
  }
}
