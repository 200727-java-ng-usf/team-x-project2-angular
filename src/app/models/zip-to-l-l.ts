export class ZipToLL{
  nhits: number;
  parameters: {
    dataset: string;
    timezone: string;
    q: number;
    rows: number;
    format: string;
  };
  records: [{
    datasetid: string;
    recordid: string;
    fields: {
      city: string;
      zip: number;
      dst: number;
      geopoint: [
        number, number
      ];
      longitude: number;
      state: string;
      latitude: number;
      timezone: number;
    }
  }]
}
