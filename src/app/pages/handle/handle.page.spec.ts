import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlePage } from './handle.page';

describe('HandlePage', () => {
  let component: HandlePage;
  let fixture: ComponentFixture<HandlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
