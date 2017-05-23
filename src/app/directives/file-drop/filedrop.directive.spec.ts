import {FiledropDirective} from './filedrop.directive';
import {ElementRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';

class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

describe('FiledropDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: ElementRef, useClass: MockElementRef}]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new FiledropDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
