// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // TODO: insert correct User API url, aka Service Layer
  USER_API_URL: 'http://project2springapp-env.eba-f2bmdfth.us-east-2.elasticbeanstalk.com',
  OPEN_WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
  OPEN_WEATHER_API_KEY: '37be25ea7137d9eef8dfdbf6d70e1b23',
  PAST_WEATHER_API_URL: 'https://api.meteostat.net/v2/stations/',
  PAST_WEATHER_SEARCH_API_URL: 'https://api.meteostat.net/v2/stations/search?query=',
  PAST_WEATHER_API_KEY: 'vouELAGs6zgSdehEZb6emuihTEf32kPf' // Must be used in Header of Request
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
