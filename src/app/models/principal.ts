export class Principal {
  userId: number;
  username: string;
  userRole: string;
  home: {
    locationId: string;
    city: string;
    state: string;
    county: string;
    locationZipCode: string;
  };
}
