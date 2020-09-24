import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenDayForecastComponent } from './seven-day-forecast.component';

describe('SevenDayForecastComponent', () => {
  let component: SevenDayForecastComponent;
  let fixture: ComponentFixture<SevenDayForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevenDayForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
