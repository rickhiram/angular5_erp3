/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillMatComponent } from './bill-mat.component';

describe('BillMatComponent', () => {
  let component: BillMatComponent;
  let fixture: ComponentFixture<BillMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
