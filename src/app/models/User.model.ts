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