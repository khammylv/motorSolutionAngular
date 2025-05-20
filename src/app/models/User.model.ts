export interface User{
    UserId: number;
    UserName: string;
    UserEmail: string;
    UserRole: string;
    UserPassword?: string;
    UserIdentification: string;
    CompanyCode?: number;
    CompanyName?: string;
}

export interface UserData{
    PageIndex : number;
    PageSize : number;
    TotalCount: number;
    TotalPages: number;
    Data: User[];
}

export interface UserLogin{
   UserEmail: string; 
   UserPassword: string;
}
export interface UserTokenPayload {
  id: string;
  name: string;
  rol: string;
  companyCode: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface Roles {
  [key: string]: string;
}