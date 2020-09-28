export class HourlyHistDataPoint{
  data: [{
    time: string;
    temp: number;
    dwpt: number;
    rhum: number;
    prcp: number;
    snow: number;
    wdir: number;
    wspd: number;
    wpgt: number;
    pres: number;
    tsun: number;
    coco: number;
  }];
  meta: {
    exec_time: number;
    generated: Date;
    source: string;
  }
}
