export class StationReturn{
  data: [{
    id: number;
    name: {
      en: string
    };
    country: string;
    region: string;
    latitude: number;
    longitude: number;
    elevation: number;
    timezone: string;
    active: string;
  }];
  meta: {
    exec_time: number;
    generated: string;
  }
}
