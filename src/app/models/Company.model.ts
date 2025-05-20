export interface Company{
    CompanyCode: number;
    CompanyName: string;
    Nit: string;
    CompanyAddress: string;
    CompanyPhone: string;
    CompanyEmail: string;
    LegalRepresentative: string;
    CompanyPassword?: string;
}
export interface CompanyTokenPayload {
  id: string;
  name: string;
  exp: number;
  iss: string;
  aud: string;
}