import { Component, OnInit } from '@angular/core';
import { PROFILE_COMPANY, PROFILE_USER } from '../../utils/constanst';
import { TblItem } from '../../models/TblItem.model';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../../services/configuration.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { catchError, of, tap } from 'rxjs';
import { error } from 'console';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/Company.model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userItems: TblItem[] = PROFILE_USER;
  companyItems: TblItem[] = PROFILE_COMPANY;
  userType!: string;
  user!: User;
  company!: Company;
  userId! : number;
  companyCode!: number;
  constructor(
    private configurationService: ConfigurationService,
    private userServices: UserService,
    private companyServices: CompanyService,
  ) {}
    actionInit: Record<string, () => void> = {
    user: () => this.getUser(),
    company: () => this.getCompany(),
  };
  ngOnInit(): void {
    this.userType = this.configurationService.isEmpresa ? 'company' : 'user';
    this.companyCode = this.configurationService.companyId;
    this.userId = this.configurationService.userId;
    this.actionInit[this.userType]?.();
   
   
  }
  getUser() {
    if(this.userId){
    this.userServices
      .getUser(this.userId)
      .pipe(
        tap((data) => {
          this.user = data;
          console.log(data)
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
    }
    
  }

  getCompany(){
  if(this.companyCode){
   this.companyServices.getCompany(this.companyCode)
      .pipe(
        tap((data) => {
          this.company = data;
          console.log(data)
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }
  }
}
