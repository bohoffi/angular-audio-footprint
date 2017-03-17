import { AudioWrapper } from './util/audio-wrapper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { SettingsDialogComponent } from './settings/settings.dialog.component';
import { FiledropDirective } from './file-drop/filedrop.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FileSelectorComponent,
    SettingsDialogComponent,
    FiledropDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    AudioWrapper,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  entryComponents: [
    SettingsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
