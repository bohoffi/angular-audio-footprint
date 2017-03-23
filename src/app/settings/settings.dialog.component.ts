import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { MdDialogRef } from '@angular/material';

import { defaultWrapperOpts, defaultChartOpts } from '../util/consts';
import { ClearSubscriptions } from '../util/decorators';
import { WrapperOpts, ChartOpts } from '../util/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.dialog.component.html',
  styleUrls: ['./settings.dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  settings: FormGroup;

  private _opts: { wrapper: WrapperOpts, chart: ChartOpts };

  constructor(public _dialogRef: MdDialogRef<SettingsDialogComponent>,
    private _fb: FormBuilder) {

    this._opts = this._dialogRef.config.data || { wrapper: defaultWrapperOpts, chart: defaultChartOpts };
  }

  ngOnInit(): void {

    this.settings = this._fb.group({
      wrapper: this._fb.group({
        fftSize: this._opts.wrapper.fftSize,
        interval: this._opts.wrapper.interval
      }),
      chart: this._fb.group({
        cellHeight: this._opts.chart.cellHeight,
        cellWidth: this._opts.chart.cellHeight,
        cellX: this._opts.chart.cellHeight,
        cellY: this._opts.chart.cellHeight
      })
    });
  }

  apply(): void {
    this._dialogRef.close(this.settings.getRawValue());
  }
  cancel(): void {
    this._dialogRef.close(null);
  }
}
