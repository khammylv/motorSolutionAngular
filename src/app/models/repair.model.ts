export interface Repairs {
    RepairId: number;
    VehicleId?: number;
    ClientId?: number;
    EntryDate: string;
    DepartureDate: string;
    RepairStatus: string;
    CompanyCode?: number;
    ClientName?: string;
    Model?: string;
    Plate?: string;
}
export interface RepairStatus{
    RepairStatus: string;
}
export interface RepairsDetails {
    RepairDetailsId: number;
    RepairId: number;
    Price: number;
    RepairServices: string;
    RepairDescription: string;
}
export interface RepairData{
    PageIndex : number;
    PageSize : number;
    TotalCount: number;
    TotalPages: number;
    Data: Repairs[];
}

export interface RepairsDTO {
    RepairId: number;
    VehicleId: number;
    ClientId: number;
    Status:string;
    CompanyCode : number;
}


export interface Status {
  Status: statusModel
}
export interface statusModel {
  completado: number;
  pendiente: number;
  en_proceso: number;
}