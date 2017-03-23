import { Component, ViewChild, ElementRef, AfterViewInit, VERSION, AfterContentInit, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { ChartComponent } from './chart/chart.component';
import { SettingsDialogComponent } from './settings/settings.dialog.component';
import { AudioWrapper } from './util/audio-wrapper';
import { defaultWrapperOpts, defaultChartOpts } from './util/consts';
import { ClearSubscriptions } from './util/decorators';
import { WrapperOpts, ChartOpts } from './util/interfaces';

@ClearSubscriptions()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  freqData: Array<Array<number>> = [];
  maxFreqs = 0;
  audioApiSupported = true;

  @ViewChild(ChartComponent)
  chart: ChartComponent;
  @ViewChild('player')
  player: ElementRef;

  private _subscriptions: any = {};
  private _opts: { wrapper: WrapperOpts, chart: ChartOpts } = { wrapper: defaultWrapperOpts, chart: defaultChartOpts };

  constructor(private _audioWrapper: AudioWrapper,
    private _dialog: MdDialog) {
    console.log('Angular: ', VERSION.full);
  }

  ngOnInit(): void {
    this.audioApiSupported = this._audioWrapper.audioApiSupported;
  }

  ngAfterViewInit(): void {
    if (this.audioApiSupported) {
      this._subscriptions = this._audioWrapper.init(this.player.nativeElement);
      this._audioWrapper.dataStream.subscribe(
        data => {
          const d = data.filter(value => value > 0);
          this.freqData.push(d);
          if (d.length > this.maxFreqs) {
            this.maxFreqs = d.length;
          }
          this.chart.update(this.freqData);
        },
        error => console.error(error)
      );
    }
  }

  openSettings(): void {
    const dialogRef = this._dialog.open(SettingsDialogComponent, { data: this._opts });
    dialogRef.afterClosed().subscribe(
      (opts: { wrapper: WrapperOpts, chart: ChartOpts }) => {
        if (opts) {
          this._opts = opts;
          this._audioWrapper.update(opts.wrapper);
          this.chart.setOpts(opts.chart);
          this._reset();
        }
      },
      error => console.error(error)
    );
  }

  fileSelected(file: File): void {
    this.player.nativeElement.src = URL.createObjectURL(file);
    this._reset();
  }

  downloadSvg(): void {
    console.log('download');
    this.player.nativeElement.pause();

    const svgData = this.chart.svg.nativeElement.outerHTML;
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'newesttree.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  private _reset(): void {
    this.freqData = [];
    this._audioWrapper.reset();
    this.chart.reset();
  }
}
