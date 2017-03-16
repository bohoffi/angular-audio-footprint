import { interval } from 'rxjs/observable/interval';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ClearSubscriptions } from "app/util/decorators";
import { ChartOpts } from "app/chart/chart.component";
import { WrapperOpts } from "app/util/audio-wrapper";

const wrapperOpts: WrapperOpts = {
  // fftSize: 256,
  fftSize: 512,
  // interval: 250
  interval: 100
};

const chartOpts: ChartOpts = {
  cellHeight: 2,
  cellWidth: 5,
  cellX: 5,
  cellY: 2
};

@ClearSubscriptions()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private _subscriptions: any = {};

  settings: FormGroup;

  @Output()
  opts = new EventEmitter();

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.settings = this._fb.group({
      wrapper: this._fb.group({
        fftSize: wrapperOpts.fftSize,
        interval: wrapperOpts.interval
      }),
      chart: this._fb.group({
        cellHeight: chartOpts.cellHeight,
        cellWidth: chartOpts.cellHeight,
        cellX: chartOpts.cellHeight,
        cellY: chartOpts.cellHeight
      })
    });

    this.opts.emit({
      wrapper: wrapperOpts,
      chart: chartOpts
    });

    this._subscriptions.settings = this.settings.valueChanges.debounceTime(500).subscribe(
      settings => this.opts.emit(settings)
    );
  }
}
