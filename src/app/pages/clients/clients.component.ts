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
import { SnackbarService } from '../../services/snackbar.service';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    TblHeadsComponent,
    TblBodyComponent,
    PaginatorTableComponent,
    ButtonIconComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private clientServices: ClientsService,
    private snackbar: SnackbarService,
    private configurationServices: ConfigurationService
  ) {}
  tblHeads: TblItem[] = TBL_CLIENT;
  clients: Array<Clients> | undefined;
  clientsSubscription: Subscription | undefined;
  pagination!: Pagination;

  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.getAllClient(
      this.configurationServices.companyId,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
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
          this.showSnackbar(
            'Cliente Agregado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllClient(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
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
          this.showSnackbar(
            'Cliente Editado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllClient(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
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
          this.showSnackbar(
            `Cliente con ID ${id} eliminado`,
            'succes',
            SUCCES_CLASS
          );
          this.getAllClient(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
        }),
        catchError((error: any) => {
          this.showSnackbar(`Error al eliminar cliente`, 'error', ERROR_CLASS);
          console.error('Error al eliminar cliente:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  showSnackbar(mensaje: string, action: string, className: string) {
    this.snackbar.show(mensaje, action, 3000, className);
  }
  ngOnDestroy(): void {
    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
  }
}
