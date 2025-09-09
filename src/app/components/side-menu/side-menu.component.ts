import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MenuItem } from 'app/models/menuItem.model';
import { LinkMenuComponent } from 'app/components/link-menu/link-menu.component';
import { CompanyService } from 'app/services/company.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { Company } from 'app/models/Company.model';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [CommonModule, MatIconModule, LinkMenuComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  iconName: string = 'home';
  @Input() items: MenuItem[] = [];
  company!: Company;
  companyCode!: number;
  constructor(
    private companyServices: CompanyService,
    private configurationService: ConfigurationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.companyCode = this.configurationService.companyId;
    this.getCompany();
  }
  getCompany() {
    if (this.companyCode) {
      this.companyServices
        .getCompany(this.companyCode)
        .pipe(
          tap((data) => {
            this.company = data;
           
          }),
          catchError((error) => {
            console.error(error);
            return of(null);
          })
        )
        .subscribe();
    }
  }

  logout() {
    this.configurationService.logout();
    this.router.navigate(["/login"]);
  }
}
