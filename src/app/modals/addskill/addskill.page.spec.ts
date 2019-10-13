import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddskillPage } from './addskill.page';

describe('AddskillPage', () => {
  let component: AddskillPage;
  let fixture: ComponentFixture<AddskillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddskillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddskillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
