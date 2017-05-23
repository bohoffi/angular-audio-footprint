import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsDialogComponent} from './settings.dialog.component';
import {
  MD_DIALOG_DATA, MdButtonModule, MdCardModule, MdDialogModule, MdDialogRef,
  MdInputModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

class MdDialogRefMock {
}

describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDialogComponent],
      imports: [MdDialogModule, MdCardModule, MdInputModule, MdButtonModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [{provide: MD_DIALOG_DATA, use: {}}, {provide: MdDialogRef, use: MdDialogRefMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
