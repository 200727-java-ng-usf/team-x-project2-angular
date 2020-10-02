import { TestBed } from '@angular/core/testing';

import { ZipToLatLonService } from './zip-to-lat-lon.service';

describe('ZipToLatLonService', () => {
  let service: ZipToLatLonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipToLatLonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
