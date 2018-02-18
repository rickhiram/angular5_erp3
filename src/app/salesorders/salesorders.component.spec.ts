/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalesordersComponent } from './salesorders.component';

describe('SalesordersComponent', () => {
  let component: SalesordersComponent;
  let fixture: ComponentFixture<SalesordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
