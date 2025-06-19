import { Component, OnInit } from '@angular/core';
import { TblItem } from '../../models/TblItem.model';
import { ERROR_CLASS, SUCCES_CLASS, TBL_CLIENT } from '../../utils/constanst';
import { Clients } from '../../models/clients.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from '../../models/Pagination.model';
import { ClientsService } from '../../services/clients.service';
import { ConfigurationService } from '../../services/configuration.service';
import { CommonModule } from '@angular/common';
import { TblHeadsComponent } from '../../components/tbl-heads/tbl-heads.component';
import { TblBodyComponent } from '../../components/tbl-body/tbl-body.component';
import { PaginatorTableComponent } from '../../components/paginator-table/paginator-table.component';
import { ButtonIconComponent } from '../../components/button-icon/button-icon.component';
import { FormClientsComponent } from '../../components/form-clients/form-clients.component';
import { DialogService } from '../../services/dialog.service';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { InformationComponent } from '../../components/information/information.component';
import { SharedService } from '../../services/shared.service';
import { RefreshService } from '../../services/refresh.service';
import { MatIconModule } from '@angular/material/icon';
import { FirstLetterUppercasePipe } from '../../pipes/first-letter-uppercase.pipe';
import { CardDetailsComponent } from '../../components/card-details/card-details.component';

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    TblHeadsComponent,
    TblBodyComponent,
    PaginatorTableComponent,
    ButtonIconComponent,
    InformationComponent,
    MatIconModule,
    FirstLetterUppercasePipe,
    CardDetailsComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private clientServices: ClientsService,
    private sharedServices: SharedService,
    private configurationServices: ConfigurationService,
    private refreshServices: RefreshService
  ) {}
  tblHeads: TblItem[] = TBL_CLIENT;
  clients!: Array<Clients>;
  clientsSubscription!: Subscription;
  pagination!: Pagination;

  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.clientsSubscription = this.refreshServices.refresh$.subscribe(() => {
      this.getAllClient(
        this.configurationServices.companyId,
        this.pagination.pageIndex,
        this.pagination.pageSize
      );
    });
  }

  getAllClient(id: number, pageIndex: number, pageSize: number) {
    this.clientsSubscription = this.clientServices
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
  }
  clientPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllClient(
      this.configurationServices.companyId,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
  registrarCliente() {
    this.dialogService
      .openDialog(FormClientsComponent, 'Formulario de Clientes', {
        action: 'add',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.sharedServices.showSnackbar(
            'Cliente Agregado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllClient(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh(); 
        }
      });
  }
  editarCliente(id: number) {
    this.dialogService
      .openDialog(FormClientsComponent, 'Formulario de Clientes', {
        id: id,
        action: 'edit',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.sharedServices.showSnackbar(
            'Cliente Editado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllClient(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh(); 
        }
      });
  }
  eliminarCliente(id: number) {
    this.dialogService
      .openDialog(DeleteConfirmComponent, 'Eliminar cliente', {
        action: 'delete',
        mensaje: '¿Estas seguro que deseas eliminar a este cliente?',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.onDeleteClient(id);
        }
      });
  }
  onDeleteClient(id: number) {
    this.clientsSubscription = this.clientServices
      .deleteClient(id)
      .pipe(
        tap(() => {
          this.sharedServices.showSnackbar(
            `Cliente con ID ${id} eliminado`,
            'succes',
            SUCCES_CLASS
          );
          this.getAllClient(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
          this.refreshServices.triggerRefresh(); 
        }),
        catchError((error: any) => {
          this.sharedServices.showSnackbar(
            `Error al eliminar cliente`,
            'error',
            ERROR_CLASS
          );
          console.error('Error al eliminar cliente:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
  }
}
