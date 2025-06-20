export interface Company{
    CompanyCode: number;
    CompanyName: string;
    Nit: string;
    CompanyAddress: string;
    CompanyPhone: string;
    CompanyEmail: string;
    LegalRepresentative: string;
    CompanyPassword?: string;
    PasswordEmail?: string;
    Status?: string;
}
export interface CompanyTokenPayload {
  id: string;
  name: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface CompanyLogin{
   CompanyEmail: string; 
   CompanyPassword: string;
}

export interface Sumary {
  Resumen: sumaryModel
}
export interface sumaryModel {
  total_users: number;
  total_clients: number;
  total_vehicles: number;
  total_bills: number;
}
/**
 * {
    "Resumen": {
        "total_users": 4,
        "total_clients": 2,
        "total_vehicles": 3,
        "total_bills": 2
    }
}
 */