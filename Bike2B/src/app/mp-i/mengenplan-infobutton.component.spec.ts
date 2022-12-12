import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MengenplanInfobuttonComponent } from './mengenplan-infobutton.component';

describe('MengenplanInfobuttonComponent', () => {
  let component: MengenplanInfobuttonComponent;
  let fixture: ComponentFixture<MengenplanInfobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MengenplanInfobuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MengenplanInfobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
