import {AudioWrapper} from './util/audio-wrapper';
import {ChartComponent} from './components/chart/chart.component';
import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {FileSelectorComponent} from './components/file-selector/file-selector.component';
import {MdCardModule, MdDialogModule, MdDialogRef, MdInputModule} from '@angular/material';

class MdDialogRefMock {
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChartComponent,
        FileSelectorComponent
      ],
      imports: [
        MdInputModule,
        MdCardModule,
        MdDialogModule
      ],
      providers: [
        AudioWrapper,
        {provide: MdDialogRef, use: MdDialogRefMock}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
