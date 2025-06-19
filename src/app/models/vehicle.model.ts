export interface Vehicle {
  VehicleId: number;
  ClientId?: number;
  Brand: string;
  Model: string;
  CompanyCode?: number;
  Plate: string;
  ClientName?: string;
}

export interface vehicleData{
    PageIndex : number;
    PageSize : number;
    TotalCount: number;
    TotalPages: number;
    Data: Vehicle[];
}