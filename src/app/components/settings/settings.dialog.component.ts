import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import {defaultChartOpts, defaultWrapperOpts} from '../../util/consts';
import {ChartOpts, WrapperOpts} from '../../util/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.dialog.component.html',
  styleUrls: ['./settings.dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  settings: FormGroup;

  private _opts: { wrapper: WrapperOpts, chart: ChartOpts };

  constructor(@Inject(MD_DIALOG_DATA) private data: any,
              private _fb: FormBuilder,
              private _dialogRef: MdDialogRef<SettingsDialogComponent>) {
    this._opts = this.data || {wrapper: defaultWrapperOpts, chart: defaultChartOpts};
  }

  ngOnInit(): void {

    this.settings = this._fb.group({
      wrapper: this._fb.group({
        fftSize: this._opts.wrapper.fftSize,
        interval: this._opts.wrapper.interval
      }),
      chart: this._fb.group({
        cellHeight: this._opts.chart.cellHeight,
        cellWidth: this._opts.chart.cellWidth,
        cellX: this._opts.chart.cellX,
        cellY: this._opts.chart.cellY
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
