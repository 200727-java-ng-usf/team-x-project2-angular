export class Forecast{
  cod: number; // "200",
    message: number; // 0,
    cnt: number; // 40,
    list: [
        {
            dt: Date;
            main: {
                temp: number; // 71.11,
                feels_like: number; // 66.42,
                temp_min: number; //  71.11,
                temp_max: number; //  72.82,
                pressure: number; //  1017,
                sea_level: number; //  1017,
                grnd_level: number; //  1010,
                humidity: number; //  43,
                temp_kf: number; //  -0.95
            },
            weather: [
                {
                    id: number; //  800,
                    main: string; // "Clear",
                    description: string //"clear sky",
                    icon: string; //"01d"
                }
            ],
            clouds: {
                all: number; //  1
            },
            wind: {
                speed: number; //  7.31,
                deg: number; //  257
            },
            visibility: number; //  10000,
            pop: number; //  0,
            sys: {
                pod: string; // "d"
            },
            dt_txt: string; // "2020-09-30 18:00:00"
        }
    ]
}
