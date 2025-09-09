import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Roles, UserTokenPayload } from '../models/User.model';
import { jwtDecode } from 'jwt-decode';
import { CompanyTokenPayload } from 'app/models/Company.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _isAdmin = false;
  private _isEmpresa = false;
  private _userId = 0;
  private _companyId = 0;
  private _userRole = '';
  private _roles: Roles = {};
  private _status: Roles = {};
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private setLoginInfo({
    isAdmin,
    isEmpresa,
    userId,
    companyId,
    userRole,
  }: {
    isAdmin: boolean;
    isEmpresa: boolean;
    userId: number;
    companyId: number;
    userRole: string;
  }) {
    this._isAdmin = isAdmin;
    this._isEmpresa = isEmpresa;
    this._userId = userId;
    this._companyId = companyId;
    this._userRole = userRole;

    localStorage.setItem(
      'authData',
      JSON.stringify({ isAdmin, isEmpresa, userId, companyId, userRole })
    );
  }

  setRoles(roles: Roles) {
    this._roles = roles;
  }
  setStatus(status: Roles) {
    this._status = status;
  }
  loadFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('authData');
      if (data) {
        const { isAdmin, isEmpresa, userId, companyId, userRole } =
          JSON.parse(data);
        this._isAdmin = isAdmin;
        this._isEmpresa = isEmpresa;
        this._userId = userId;
        this._companyId = companyId;
        this._userRole = userRole;
        console.log('data =>', data);
      }
    } else {
      console.warn('Intento de acceso a localStorage en entorno no navegador');
    }
  }

  private getTokenPayload(): UserTokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserTokenPayload>(token);
    } catch (error) {
      console.error('Token de usuario inválido', error);
      return null;
    }
  }
  getCompanyToken(): CompanyTokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<CompanyTokenPayload>(token);
    } catch (error) {
      console.error('Token de empresa inválido', error);
      return null;
    }
  }
  redirectionUser(): boolean {
    const userInformation = this.getTokenPayload();

    if (!userInformation) {
      this.logout(); // Elimina token, info del usuario, etc.
      throw new Error('Token inválido o ausente. Redirigiendo a login.');
    }

    const isAdmin = userInformation.rol === 'administrador';
    const isEmpresa = userInformation.isEmpresa === 'true';

    this.setLoginInfo({
      isAdmin: isAdmin,
      isEmpresa: isEmpresa,
      userId: Number(userInformation.id),
      companyId: Number(userInformation.companyCode),
      userRole: userInformation.rol,
    });

    return isAdmin;
  }
  setInfo(){
    const userInformation = this.getTokenPayload();
     if (!userInformation) {
      this.logout(); // Elimina token, info del usuario, etc.
      throw new Error('Token inválido o ausente. Redirigiendo a login.');
    }
  console.log(userInformation)
    const isAdmin = userInformation.rol === 'administrador';
    const isEmpresa = userInformation.isEmpresa === 'true';

    this.setLoginInfo({
      isAdmin: isAdmin,
      isEmpresa: isEmpresa,
      userId: Number(userInformation.id),
      companyId: Number(userInformation.companyCode),
      userRole: userInformation.rol,
    });

    return isAdmin;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  get Roles(): Roles {
    return this._roles;
  }
  get Status(): Roles {
    return this._status;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  get isEmpresa(): boolean {
    return this._isEmpresa;
  }

  get userId(): number {
    return this._userId;
  }

  get companyId(): number {
    return this._companyId;
  }

  get userRole(): string {
    return this._userRole;
  }

  logout() {
    this._isAdmin = false;
    this._isEmpresa = false;
    this._userId = 0;
    this._companyId = 0;
    this._userRole = '';
    localStorage.removeItem('authData');
    localStorage.removeItem('token');
  }
}
