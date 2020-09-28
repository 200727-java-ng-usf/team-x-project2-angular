import { TestBed } from '@angular/core/testing';

import { SevenDayForecastService } from './seven-day-forecast.service';

describe('SevenDayForecastService', () => {
  let service: SevenDayForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SevenDayForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
