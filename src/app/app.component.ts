import { AudioWrapper, WrapperOpts } from './util/audio-wrapper';
import { Observable } from 'rxjs/Rx';
import { ChartComponent, ChartOpts } from './chart/chart.component';
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

const chartOpts: ChartOpts = {
  cellHeight: 2,
  cellWidth: 5,
  cellX: 5,
  cellY: 2
};
const wrapperOpts: WrapperOpts = {
  // fftSize: 256,
  fftSize: 512,
  // interval: 250
  interval: 100
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  freqData: Array<Array<number>> = [];

  private _audioFile: File;

  @ViewChild(ChartComponent)
  private chart: ChartComponent;
  @ViewChild('player')
  private _player: ElementRef;

  constructor(private _audioWrapper: AudioWrapper) {
  }

  ngAfterViewInit(): void {

    this.chart.setOpts(chartOpts);

    this._audioWrapper.init(this._player.nativeElement, wrapperOpts);
    this._audioWrapper.dataStream.subscribe(
      data => {
        // console.log(res);
        this.freqData.push(data);
        this.chart.update(this.freqData);
      },
      error => console.error(error)
    );
  }

  fileSelected(file: File): void {
    console.log(file);
    this._audioFile = file;
    this._player.nativeElement.src = URL.createObjectURL(file);
  }

  get fileSet(): boolean {
    return this._audioFile !== undefined && this._audioFile !== null;
  }
}
