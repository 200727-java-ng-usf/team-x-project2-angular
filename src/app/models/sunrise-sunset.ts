import { Time } from '@angular/common'

export class SunriseSunset{
  results: {
    sunrise: Time;
    sunset: Time;
    solar_noon: Time;
    day_length: Time;
    civil_twilight_begin: Time;
    civil_twilight_end: Time;
    nautical_twilight_begin: Time;
    nautical_twilight_end: Time;
    astronomical_twilight_begin: Time;
    astronomical_twilight_end: Time;
  };
  status: string;
}
