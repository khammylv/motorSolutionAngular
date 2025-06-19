export interface Billings {
  BillingId: number;
  RepairId: number;
  BillingDate: string;
  Amount: number;
  EntryDate: string;
  DepartureDate: string;
  RepairStatus: string;
  Model: string;
  Plate: string;
  ClientName?: string;
  CompanyName: string;
  CompanyAddress?: string;
  CompanyEmail?: string;
  CompanyPhone?: string;
  Nit?: string;
}

export interface billingData{
    PageIndex : number;
    PageSize : number;
    TotalCount: number;
    TotalPages: number;
    Data: Billings[];
}

export interface BillingsDTO {
  BillingId: number;
  RepairId: number;
  ClientId: number;
  Amount: number;
  CompanyCode: number;
}
