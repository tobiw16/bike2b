import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosgroessenInfobuttonComponent } from './losgroessen-infobutton.component';

describe('LosgroessenInfobuttonComponent', () => {
  let component: LosgroessenInfobuttonComponent;
  let fixture: ComponentFixture<LosgroessenInfobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosgroessenInfobuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LosgroessenInfobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
