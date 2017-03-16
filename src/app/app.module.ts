import { AudioWrapper } from './util/audio-wrapper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FileSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AudioWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
