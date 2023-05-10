//the structure of the contacts information the will fetched from an API / database
export interface fetchedContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  group: any;
}
