import { Component, Input, OnInit } from '@angular/core';
import { ERROR_CLASS, SUCCES_CLASS, TBL_REPAIRS } from '../../utils/constanst';
import { TblItem } from '../../models/TblItem.model';
import { Repairs, RepairsDTO, RepairStatus } from '../../models/repair.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from '../../models/Pagination.model';
import { RepairsService } from '../../services/repairs.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TblHeadsComponent } from '../tbl-heads/tbl-heads.component';
import { TblBodyComponent } from '../tbl-body/tbl-body.component';
import { PaginatorTableComponent } from '../paginator-table/paginator-table.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { InformationComponent } from '../information/information.component';
import { DialogService } from '../../services/dialog.service';
import { RepirDetailsComponent } from '../repir-details/repir-details.component';
import { StatusClassPipe } from '../../pipes/status-class.pipe';
import { FormStatusComponent } from '../form-status/form-status.component';
import { FormRepairComponent } from '../form-repair/form-repair.component';
import { SharedService } from '../../services/shared.service';
import { ConfigurationService } from '../../services/configuration.service';
import { RefreshService } from '../../services/refresh.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { FormEmailComponent } from '../form-email/form-email.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repairs-tab',
  imports: [
    CommonModule,
    TblHeadsComponent,
    TblBodyComponent,
    PaginatorTableComponent,
    ButtonIconComponent,
    InformationComponent,
    StatusClassPipe,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
   
  ],
  templateUrl: './repairs-tab.component.html',
  styleUrl: './repairs-tab.component.css',
})
export class RepairsTabComponent implements OnInit {
  @Input() infoTab!: string;
  @Input() idSearch!: number;
  @Input() idClient!: number | undefined;
  constructor(
    private repairServices: RepairsService,
    private dialogService: DialogService,
    private sharedServices: SharedService,
    private configurationServices: ConfigurationService,
   
    private refreshServices: RefreshService
  ) {}
  tblHeads: TblItem[] = TBL_REPAIRS;
  repairs!: Array<Repairs>;
  repairId!: number;
  repairsSubscription!: Subscription;
  pagination!: Pagination;
  isVehicleMode: boolean = false;
  selectedRepair: any = null;
  action: Record<
    string,
    (id: number, pageIndex: number, pageSize: number) => void
  > = {
    company: (id: number, pageIndex: number, pageSize: number) =>
      this.getRepairsByCompany(id, pageIndex, pageSize),
    vehicle: (id: number, pageIndex: number, pageSize: number) =>
      this.getRepairByVehicle(id, pageIndex, pageSize),
  };
  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.repairId = this.sharedServices.generateId();
    this.isVehicleMode = this.infoTab === 'vehicle';
    this.getAllRepairs(
      this.idSearch,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
    this.repairsSubscription = this.refreshServices.refresh$.subscribe(() => {
      this.getAllRepairs(
        this.idSearch,
        this.pagination.pageIndex,
        this.pagination.pageSize
      );
    });
  }
 formatDate(dateString: string | null | undefined): string {
 return  this.sharedServices.formatDate(dateString);
}

  getAllRepairs(id: number, pageIndex: number, pageSize: number) {
    this.action[this.infoTab]?.(id, pageIndex, pageSize);
  }
  getRepairsByCompany(id: number, pageIndex: number, pageSize: number) {
    this.repairsSubscription = this.repairServices
      .getAllRepair(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.repairs = data.Data;

          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: pageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  getRepairByVehicle(id: number, pageIndex: number, pageSize: number) {
    this.repairsSubscription = this.repairServices
      .getRepairByVehicle(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.repairs = data.Data;
          
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: pageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  repairsPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllRepairs(
      this.idSearch,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
  viewDetails(id: number) {
    this.dialogService
      .openDialog(RepirDetailsComponent, 'Detalles reparacion', {
        action: 'view',
        id: id,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }
  getRepairDescription(id: number) {
    this.repairsSubscription = this.repairServices
      .getRepairDetails(id)
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((error: any) => {
          console.error('Error al obtener reparaciones:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  cambiarStatus(id: number, status: string) {
    
    if(status === 'completado'){
      return
    }
    this.dialogService
      .openDialog(FormStatusComponent, 'Status reparación', {
        action: 'editStatus',
       
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
         
          if(result.doneRepair){
            
            this.doneRepair(id)
          }else{
          this.changeStatus(id,result.RepairStatus);
          }
          
          
        }
      });
  }
  changeStatus(id:number,status: RepairStatus){
   
     this.repairsSubscription = this.repairServices
      .changeStatus(id,status)
      .pipe(
        tap(() => {
          
          this.sharedServices.showSnackbar(
            'Status cambiado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllRepairs(
            this.idSearch,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh();
        }),
        catchError((error: any) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  editarRepair(id: number) {
    this.dialogService
      .openDialog(FormRepairComponent, 'Formulario de reparacion', {
        action: 'edit',
        id: id,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }
  registrarRepair() {
    const repairDtod: RepairsDTO = {
      RepairId: this.repairId,
      VehicleId: this.idSearch,
      ClientId: this.idClient as number,
      Status: 'pendiente',
      CompanyCode: this.configurationServices.companyId,
    };
    this.repairsSubscription = this.repairServices
      .addRepair(repairDtod)
      .pipe(
        tap((data) => {
          this.repairs = data.Data;
          console.log(data);
          this.sharedServices.showSnackbar(
            'Reparacion agregada Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllRepairs(
            this.idSearch,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh();
        }),
        catchError((error: any) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      )
      .subscribe();
   
  }
  doneRepair(id: number){
    const repairDtod: RepairsDTO = {
      RepairId: id,
      VehicleId: this.idSearch,
      ClientId: this.idClient as number,
      Status: 'completado',
      CompanyCode: this.configurationServices.companyId,
    };
        this.repairsSubscription = this.repairServices
      .doneRepair(repairDtod)
      .pipe(
        tap((data) => {
          this.repairs = data.Data;
          console.log(data);
          this.sharedServices.showSnackbar(
            'Reparacion terminada Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllRepairs(
            this.idSearch,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh();
        }),
        catchError((error: any) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  eliminarRepair(id: number) {
     this.dialogService
         .openDialog(DeleteConfirmComponent, 'Eliminar reparación', {
           action: 'delete',
           mensaje: '¿Estas seguro que deseas eliminar a esta reparación?',
         })
         .afterClosed()
         .subscribe((result) => {
           if (result) {
             console.log(result);
             console.log("id delete =>",id)
             this.onDeleteRepair(id);
           }
         });
  }
  onDeleteRepair(id: number) {
      this.repairsSubscription = this.repairServices
        .deleteRepair(id)
        .pipe(
          tap(() => {
            this.sharedServices.showSnackbar(
              `Reparacion con ID ${id} eliminado`,
              'succes',
              SUCCES_CLASS
            );
            this.getAllRepairs(
              this.idSearch,
              this.pagination.pageIndex,
              this.pagination.pageSize
            );
            this.refreshServices.triggerRefresh(); 
          }),
          catchError((error: any) => {
            this.sharedServices.showSnackbar(
              `Error al eliminar reparacion`,
              'error',
              ERROR_CLASS
            );
            console.error('Error al eliminar reparacion:', error);
            return of(null);
          })
        )
        .subscribe();
    }
    sendEmail(id?: number){
     this.dialogService
         .openDialog(FormEmailComponent, 'Eliminar reparación', {
           action: 'sendEmail',
           id: id,
         })
         .afterClosed()
         .subscribe((result) => {
          if(result){
               this.sharedServices.showSnackbar(
              `Email enviado exitosamente`,
              'succes',
              SUCCES_CLASS
            );
          }
         
         });
    }
  ngOnDestroy(): void {
    if (this.repairsSubscription) {
      this.repairsSubscription.unsubscribe();
    }
  }
}
