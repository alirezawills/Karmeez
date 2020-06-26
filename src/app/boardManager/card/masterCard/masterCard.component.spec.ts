/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MasterCardComponent } from './masterCard.component';

describe('MasterCardComponent', () => {
  let component: MasterCardComponent;
  let fixture: ComponentFixture<MasterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
