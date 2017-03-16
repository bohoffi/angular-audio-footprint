import { AudioWrapper, WrapperOpts } from './util/audio-wrapper';
import { Observable } from 'rxjs/Rx';
import { ChartComponent, ChartOpts } from './chart/chart.component';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  freqData: Array<Array<number>> = [];

  @ViewChild(ChartComponent)
  private chart: ChartComponent;
  @ViewChild('player')
  private _player: ElementRef;

  constructor(private _audioWrapper: AudioWrapper) {
  }

  ngOnInit(): void {
    this._audioWrapper.init(this._player.nativeElement);
    this._audioWrapper.dataStream.subscribe(
      data => {
        // console.log(res);
        this.freqData.push(data);
        this.chart.update(this.freqData);
      },
      error => console.error(error)
    );
  }

  settingsChanged(opts): void {
    this._audioWrapper.update(opts.wrapper);
    this.chart.setOpts(opts.chart);
  }

  fileSelected(file: File): void {
    this._player.nativeElement.src = URL.createObjectURL(file);
    this.freqData = [];
    this._audioWrapper.reset();
    this.chart.reset();
  }
}
