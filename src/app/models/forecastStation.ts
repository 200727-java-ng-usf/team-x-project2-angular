export class StationReturn{
  properties: {
    cwa: string;
    forecastOffice: string; // "https://api.weather.gov/offices/CAE",
    gridId: string; // 'CAE' station
    grid: number; // 91
    gridY: number; // 58
    forecast: string; // "https://api.weather.gov/gridpoints/CAE/91,58/forecast",
    forecastHourly: string; // "https://api.weather.gov/gridpoints/CAE/91,58/forecast/hourly",
    forecastGridData: string; // "https://api.weather.gov/gridpoints/CAE/91,58",
    observationStations: string; // "https://api.weather.gov/gridpoints/CAE/91,58/stations",
    relativeLocation: {
        type: string; // "Feature",
        geometry: {
            type: string; // "Point",
            coordinates: [
                number, // -80.292900000000003,
                number // 33.926946000000001
            ]
        };
        properties: {
            city: string; // "East Sumter",
            state: string; // "SC",
            distance: {
                value: number; // 3067.0587734895998,
                unitCode: string; // "unit:m"
            };
            bearing: {
                value: number; // 192,
                unitCode: string; // "unit:degrees_true"
            }
        }
    };
    forecastZone: string; // "https://api.weather.gov/zones/forecast/SCZ031",
    county: string; // "https://api.weather.gov/zones/county/SCC085",
    fireWeatherZone: string; // "https://api.weather.gov/zones/fire/SCZ031",
    timeZone: string; // "America/New_York",
    radarStation: string; // "KCAE"
  };
}
