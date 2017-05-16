import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FullscreenOverlayContainer, OverlayContainer} from '@angular/material';

import {AppComponent} from './app.component';
import {ChartComponent} from './components/chart/chart.component';
import {FiledropDirective} from './directives/file-drop/filedrop.directive';
import {FileSelectorComponent} from './components/file-selector/file-selector.component';
import {SettingsDialogComponent} from './components/settings/settings.dialog.component';
import {AudioWrapper} from './util/audio-wrapper';
import {AppMaterialModule} from './app-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    HttpModule,
    AppMaterialModule,
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
