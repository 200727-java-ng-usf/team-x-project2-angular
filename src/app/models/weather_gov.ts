export class WeatherGov {
  type: string;
  geometry: {
    type: string;
    coordinates: [
      [
        [
          number, number
        ],
      ]
    ]
  };
  properties: {
    updated: Date;
    units: string;
    forecastGenerator: string;
    generatedAt: Date;
    updatedTime: Date;
    validTimes: Date;
    elevation: [
      value: number,
      unitCode: string
    ]
    periods: [{
      number: number;
      name: string;
      startTime: Date;
      endTime: Date;
      isDaytime: boolean;
      temperature: number;
      temperatureUnit: string;
      temperatureTrend: string;
      maxTemperature: number;
      minTemperature: number;
      windSpeed: string;
      windDirection: string;
      icon: string;
      shortForecast: string;
      detailedForecast: string;
    }];
  };


}
