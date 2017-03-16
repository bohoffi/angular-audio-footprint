import { AudioWrapper } from './util/audio-wrapper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FileSelectorComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    AudioWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
