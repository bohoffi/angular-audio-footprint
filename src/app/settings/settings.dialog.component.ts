import { interval } from 'rxjs/observable/interval';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ClearSubscriptions } from "app/util/decorators";
import { ChartOpts } from "app/chart/chart.component";
import { WrapperOpts } from "app/util/audio-wrapper";
import { MdDialogRef } from "@angular/material";
import { defaultWrapperOpts, defaultChartOpts } from "app/util/consts";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.dialog.component.html',
  styleUrls: ['./settings.dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  settings: FormGroup;

  constructor(public _dialogRef: MdDialogRef<SettingsDialogComponent>,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.settings = this._fb.group({
      wrapper: this._fb.group({
        fftSize: defaultWrapperOpts.fftSize,
        interval: defaultWrapperOpts.interval
      }),
      chart: this._fb.group({
        cellHeight: defaultChartOpts.cellHeight,
        cellWidth: defaultChartOpts.cellHeight,
        cellX: defaultChartOpts.cellHeight,
        cellY: defaultChartOpts.cellHeight
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
