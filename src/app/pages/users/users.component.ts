import { Component, OnInit } from '@angular/core';
import { TblItem } from '../../models/TblItem.model';
import { User } from '../../models/User.model';
import { TblHeadsComponent } from '../../components/tbl-heads/tbl-heads.component';
import { TblBodyComponent } from '../../components/tbl-body/tbl-body.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { PaginatorTableComponent } from '../../components/paginator-table/paginator-table.component';
import { UserService } from '../../services/user.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { Pagination } from '../../models/Pagination.model';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { SnackbarService } from '../../services/snackbar.service';
import { ButtonIconComponent } from '../../components/button-icon/button-icon.component';
import { ConfigurationService } from '../../services/configuration.service';
import { ERROR_CLASS, SUCCES_CLASS, TBL_USER } from '../../utils/constanst';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TblHeadsComponent,
    TblBodyComponent,
    PaginatorTableComponent,
    ButtonIconComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private userServices: UserService,
    private snackbar: SnackbarService,
    private configurationServices: ConfigurationService
  ) {}
  tblHeads: TblItem[] = TBL_USER;

  users: Array<User> | undefined;
  userSubscription: Subscription | undefined;
  pagination!: Pagination;

  ngOnInit(): void {
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };

    this.getAllUser(
      this.configurationServices.companyId,
      this.pagination.pageIndex,
      this.pagination.pageSize
    );
    this.getRoles();
  }

  getAllUser(id: number, pageIndex: number, pageSize: number) {
    this.userSubscription = this.userServices
      .getAllUser(id, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.users = data.Data;
          this.pagination = {
            pageIndex: data.PageIndex,
            pageSize: data.PageSize,
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
  userPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllUser(
      this.configurationServices.companyId,
      pagination.pageIndex,
      pagination.pageSize
    );
  }
  editarUsuario(id: number) {
    this.dialogService
      .openDialog(FormUserComponent, 'Formulario de Usuario', {
        id: id,
        action: 'edit',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.showSnackbar(
            'Usuario Editado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllUser(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
        }
      });
  }
  registrarUsuario() {
    this.dialogService
      .openDialog(FormUserComponent, 'Formulario de Usuario', {
        action: 'add',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.showSnackbar(
            'Usuario Agregado Exitosamente',
            'Success',
            SUCCES_CLASS
          );
          this.getAllUser(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
        }
      });
  }
  eliminarUsuario(id: number) {
    this.dialogService
      .openDialog(DeleteConfirmComponent, 'Eliminar usuario', {
        action: 'delete',
        mensaje: '¿Estas seguro que deseas eliminar a este usuario?',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.onDeleteUser(id);
        }
      });
  }

  onDeleteUser(id: number) {
    this.userSubscription = this.userServices
      .deleteUser(id)
      .pipe(
        tap(() => {
          this.showSnackbar(
            `Usuario con ID ${id} eliminado`,
            'succes',
            SUCCES_CLASS
          );
          this.getAllUser(
            this.configurationServices.companyId,
            this.pagination.pageIndex,
            this.pagination.pageSize
          );
        }),
        catchError((error: any) => {
          this.showSnackbar(`Error al eliminar usuario`, 'error', ERROR_CLASS);
          console.error('Error al eliminar usuario:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  getRoles() {
    this.userSubscription = this.userServices
      .getRoles()
      .pipe(
        tap((response) => {
          this.configurationServices.setRoles(response.Roles);
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  showSnackbar(mensaje: string, action: string, className: string) {
    this.snackbar.show(mensaje, action, 3000, className);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
