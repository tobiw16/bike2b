import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapaplanInfobuttonComponent } from './kapaplan-infobutton.component';

describe('KapaplanInfobuttonComponent', () => {
  let component: KapaplanInfobuttonComponent;
  let fixture: ComponentFixture<KapaplanInfobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KapaplanInfobuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapaplanInfobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
