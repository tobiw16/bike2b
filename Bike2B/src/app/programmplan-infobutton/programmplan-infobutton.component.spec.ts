import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammplanInfobuttonComponent } from './programmplan-infobutton.component';

describe('ProgrammplanInfobuttonComponent', () => {
  let component: ProgrammplanInfobuttonComponent;
  let fixture: ComponentFixture<ProgrammplanInfobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammplanInfobuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammplanInfobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
