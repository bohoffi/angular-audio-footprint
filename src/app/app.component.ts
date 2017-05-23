import {AfterViewInit, Component, ElementRef, OnInit, VERSION, ViewChild} from '@angular/core';

import {MdDialog} from '@angular/material';

import {ArcDataObject, ChartComponent} from './components/chart/chart.component';
import {SettingsDialogComponent} from './components/settings/settings.dialog.component';
import {AudioWrapper} from './util/audio-wrapper';
import {defaultChartOpts, defaultWrapperOpts} from './util/consts';
import {ClearSubscriptions} from './util/decorators';
import {ChartOpts, WrapperOpts} from './util/interfaces';
import {arcDataObjectTransformer} from './util/utils';

@ClearSubscriptions()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  freqData: Array<ArcDataObject> = [];
  audioApiSupported = true;

  @ViewChild(ChartComponent)
  chart: ChartComponent;
  @ViewChild('player')
  player: ElementRef;

  private _subscriptions: any = {};
  private _opts: { wrapper: WrapperOpts, chart: ChartOpts }
    = {wrapper: defaultWrapperOpts, chart: defaultChartOpts};

  private static _handleError(error: Error): void {
    console.error(error);
  }

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
      this._handleDataStream();
      this._handleStateStream();
    }
  }

  private _handleDataStream(): void {
    this._audioWrapper.dataStream.subscribe(data => this._processStreamData(data), AppComponent._handleError, this._updateChart);
  }

  private _processStreamData(data: number[]): void {
    this.freqData = this.freqData.concat(arcDataObjectTransformer(data.filter(value => value > 0), this.freqData.length));
  }

  private _handleStateStream(): void {
    this._audioWrapper.stateStream.subscribe(state => this._processState(state), AppComponent._handleError);
  }

  private _processState(state: boolean): void {
    if (state) {
      ChartComponent.reset();
    } else {
      this._updateChart();
    }
  }

  private _updateChart(): void {
    this.chart.update(this.freqData);
  }

  openSettings(): void {
    const dialogRef = this._dialog.open(SettingsDialogComponent, {data: this._opts, hasBackdrop: true});
    dialogRef.afterClosed().subscribe(this._handleSettings, AppComponent._handleError);
  }

  private _handleSettings(opts: { wrapper: WrapperOpts, chart: ChartOpts }): void {
    if (opts) {
      this._opts = opts;
      this._audioWrapper.update(opts.wrapper);
      this.chart.setOpts(opts.chart);
      this._reset();
    }
  }

  fileSelected(file: File): void {
    this.player.nativeElement.src = URL.createObjectURL(file);
    this._reset();
  }

  downloadSvg(): void {
    console.log('download');
    this.player.nativeElement.pause();

    const svgData = this.chart.svg.nativeElement.outerHTML;
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
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
    ChartComponent.reset();
  }
}
