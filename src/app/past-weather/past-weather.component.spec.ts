import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWeatherComponent } from './past-weather.component';

describe('PastWeatherComponent', () => {
  let component: PastWeatherComponent;
  let fixture: ComponentFixture<PastWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
