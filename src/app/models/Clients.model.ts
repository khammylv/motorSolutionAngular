export interface Clients {
    ClientId: number;
    Name: string;
    Email: string;
    Phone: string;
    Identification: string;
    CompanyCode?: number;
    CompanyName?: string;
}

export interface ClientData{
    PageIndex : number;
    PageSize : number;
    TotalCount: number;
    TotalPages: number;
    Data: Clients[];
}
