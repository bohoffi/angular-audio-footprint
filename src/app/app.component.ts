import { SettingsDialogComponent } from './settings/settings.dialog.component';
import { AudioWrapper, WrapperOpts } from './util/audio-wrapper';
import { ChartComponent, ChartOpts } from './chart/chart.component';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MdDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  freqData: Array<Array<number>> = [];
  maxFreqs: number = 0;

  @ViewChild(ChartComponent)
  chart: ChartComponent;
  @ViewChild('player')
  player: ElementRef;

  constructor(private _audioWrapper: AudioWrapper,
    private _dialog: MdDialog) {
  }

  ngOnInit(): void {
    this._audioWrapper.init(this.player.nativeElement);
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

  openSettings(): void {
    let dialogRef = this._dialog.open(SettingsDialogComponent);
    dialogRef.afterClosed().subscribe(
      opts => {
        if (opts) {
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

  private _reset(): void {
    this.freqData = [];
    this._audioWrapper.reset();
    this.chart.reset();
  }
}
