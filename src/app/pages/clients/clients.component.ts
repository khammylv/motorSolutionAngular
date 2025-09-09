import { Component, OnInit } from '@angular/core';
import { TblItem } from 'app/models/TblItem.model';
import { ERROR_CLASS, SUCCES_CLASS, TBL_CLIENT } from 'app/utils/constanst';
import { Clients } from 'app/models/clients.model';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from 'app/models/Pagination.model';
import { ClientsService } from 'app/services/clients.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { CommonModule } from '@angular/common';
import { PaginatorTableComponent } from 'app/components/paginator-table/paginator-table.component';
import { ButtonIconComponent } from 'app/components/button-icon/button-icon.component';
import { FormClientsComponent } from 'app/components/form-clients/form-clients.component';
import { DialogService } from 'app/services/dialog.service';
import { DeleteConfirmComponent } from 'app/components/delete-confirm/delete-confirm.component';
import { InformationComponent } from 'app/components/information/information.component';
import { SharedService } from 'app/services/shared.service';
import { RefreshService } from 'app/services/refresh.service';
import { MatIconModule } from '@angular/material/icon';
import { FirstLetterUppercasePipe } from 'app/pipes/first-letter-uppercase.pipe';
import { CardDetailsComponent } from 'app/components/card-details/card-details.component';

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
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
