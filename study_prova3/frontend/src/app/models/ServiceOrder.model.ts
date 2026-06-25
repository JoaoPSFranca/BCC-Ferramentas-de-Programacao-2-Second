export interface ServiceOrder {
  id?: number;
  vehiclePlate: string;
  openingDate: string;
  status: string;
  totalValue: number;
  user: string;
  items: any[];
}
