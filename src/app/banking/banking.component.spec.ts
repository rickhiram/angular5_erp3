/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BankingComponent } from './banking.component';

describe('BankingComponent', () => {
  let component: BankingComponent;
  let fixture: ComponentFixture<BankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
