/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkorderComponent } from './workorder.component';

describe('WorkorderComponent', () => {
  let component: WorkorderComponent;
  let fixture: ComponentFixture<WorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
