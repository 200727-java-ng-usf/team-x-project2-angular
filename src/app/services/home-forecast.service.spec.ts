import { TestBed } from '@angular/core/testing';

import { HomeForecastService } from './home-forecast.service';

describe('HomeForecastService', () => {
  let service: HomeForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
