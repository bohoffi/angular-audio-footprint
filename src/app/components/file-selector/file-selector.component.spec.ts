import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileSelectorComponent} from './file-selector.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FileSelectorComponent', () => {
  let component: FileSelectorComponent;
  let fixture: ComponentFixture<FileSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSelectorComponent ],
      imports: [FlexLayoutModule, MdInputModule, MdButtonModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
