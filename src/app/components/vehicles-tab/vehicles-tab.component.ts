import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TblHeadsComponent } from '../tbl-heads/tbl-heads.component';
import { TblBodyComponent } from '../tbl-body/tbl-body.component';
import { PaginatorTableComponent } from '../paginator-table/paginator-table.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { InformationComponent } from '../information/information.component';
import { DialogService } from '../../services/dialog.service';
import { VehiclesService } from '../../services/vehicles.service';
import { SharedService } from '../../services/shared.service';
import { ConfigurationService } from '../../services/configuration.service';
import { ERROR_CLASS, SUCCES_CLASS, TBL_VEHICLE } from '../../utils/constanst';
import { TblItem } from '../../models/TblItem.model';
import { Vehicle } from '../../models/vehicle.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from '../../models/Pagination.model';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import { FormVehicleComponent } from '../form-vehicle/form-vehicle.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { RefreshService } from '../../services/refresh.service';
import { FirstLetterUppercasePipe } from '../../pipes/first-letter-uppercase.pipe';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { StatusClassPipe } from '../../pipes/status-class.pipe';

@Component({
  selector: 'app-vehicles-tab',
  imports: [
    CommonModule,
    PaginatorTableComponent,
    ButtonIconComponent,
    InformationComponent,
    FirstLetterUppercasePipe,
    CardDetailsComponent
  ],
  templateUrl: './vehicles-tab.component.html',
  styleUrl: './vehicles-tab.component.css',
})
export class VehiclesTabComponent implements OnInit {
  @Input() infoTab!: string;
  @Input() idSearch!: number;

  constructor(
    private dialogService: DialogService,
    private vehiclesServices: VehiclesService,
    private sharedServices: SharedService,
    private configurationServices: ConfigurationService,
    private refreshServices : RefreshService
  ) {}
  tblHeads: TblItem[] = TBL_VEHICLE;
  vehicles!: Array<Vehicle>;
  vehiclesSubscription!: Subscription;
  pagination!: Pagination;
  isClientMode: boolean = false;
  //clients!: Array<Clients> ;
  action: Record<
    string,
    (id: number, pageIndex: number, pageSize: number) => void
  > = {
    company: (id: number, pageIndex: number, pageSize: number) =>
      this.getVehiclesByCompany(id, pageIndex, pageSize),
    client: (id: number, pageIndex: number, pageSize: number) =>
      this.getVehiclesByClient(id, pageIndex, pageSize),
  };
  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.isClientMode = this.infoTab === 'client';

    this.getAllVehicles(
      this.idSearch,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
        this.vehiclesSubscription = this.refreshServices.refresh$.subscribe(() => {
      this.getAllVehicles(
        this.idSearch,
        this.pagination.pageIndex,
        this.pagination.pageSize
      );
    });
  }

  getAllVehicles(id: number, pageIndex: number, pageSize: number) {
   this.action[this.infoTab]?.(id, pageIndex, pageSize);
  }
  getVehiclesByClient(id: number, pageIndex: number, pageSize: number) {
    this.vehiclesSubscription = this.vehiclesServices
      .getVehicleByClient(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.vehicles = data.Data;
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

  /* getAllClient(id: number, pageIndex: number, pageSize: number) {
    this.vehiclesSubscription = this.clientServices
      .getAllClients(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.clients = data.Data;
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: data.PageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener clientes:', error);
          return of(null);
        })
      )
      .subscribe();
  }*/
  getVehiclesByCompany(id: number, pageIndex: number, pageSize: number) {
    this.vehiclesSubscription = this.vehiclesServices
      .getAllVehicle(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.vehicles = data.Data;
        
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: pageSize,
            length: data.TotalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener vehiculos:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  vehiclePagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllVehicles(
      this.idSearch,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
  editarVehicle(id: number) {
    this.dialogService
      .openDialog(FormVehicleComponent, 'Formulario de vehiculos', {
        action: 'edit',
        id: id,
        idClient: this.idSearch,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.sharedServices.showSnackbar(
            'Vehiculo Editado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllVehicles(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh(); 
        }
      });
  }
  registrarVehicle() {
    this.dialogService
      .openDialog(FormVehicleComponent, 'Formulario de vehiculos', {
        action: 'add',
        idClient: this.idSearch,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.sharedServices.showSnackbar(
            'Vehiculo Agregado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllVehicles(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh(); 
        }
      });
  }
  eliminarVehicle(id: number) {
    this.dialogService
      .openDialog(DeleteConfirmComponent, 'Eliminar vehiculo', {
        action: 'delete',
        mensaje: '¿Estas seguro que deseas eliminar a este vehiculo?',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.onDeleteVehicle(id);
        }
      });
  }
  onDeleteVehicle(id: number) {
    this.vehiclesSubscription = this.vehiclesServices
      .deleteVehicle(id)
      .pipe(
        tap(() => {
          this.sharedServices.showSnackbar(
            `Vehiculo con ID ${id} eliminado`,
            'succes',
            SUCCES_CLASS
          );
          this.getAllVehicles(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh(); 
        }),
        catchError((error: any) => {
          this.sharedServices.showSnackbar(
            `Error al eliminar vehiculo`,
            'error',
            ERROR_CLASS
          );
          console.error('Error al eliminar vehiculo:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    if (this.vehiclesSubscription) {
      this.vehiclesSubscription.unsubscribe();
    }
  }
}
