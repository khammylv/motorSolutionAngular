import { Component } from '@angular/core';
import {TblItem} from '../../models/TblItem.model';
import {User} from '../../models/User.model';
import { TblHeadsComponent } from '../../components/tbl-heads/tbl-heads.component';
import { TblBodyComponent } from '../../components/tbl-body/tbl-body.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.services';
import { FormUserComponent } from '../../components/form-user/form-user.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TblHeadsComponent, TblBodyComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',

})
export class UsersComponent {
  constructor(private dialogService: DialogService) {}
  nameEjem : string = "Vera";
  tblHeads: TblItem[] = [
      { name: 'Ususario'},
      { name: 'Email'},
      { name: 'Identificación'},
      { name: 'Role'},
      { name: 'Action',}
    ];

     users: User[] = [
      {
        UserId: 1,
        UserName: 'Juan Pérez',
        UserEmail: 'juan.perez@empresa.com',
        UserRole: 'Admin',
        UserPassword: 'Admin123!',
        UserIdentification: '123456789',
        CompanyCode: 101
      },
      {
        UserId: 2,
        UserName: 'María García',
        UserEmail: 'maria.garcia@empresa.com',
        UserRole: 'User',
        UserPassword: 'Maria456!',
        UserIdentification: '987654321',
        CompanyCode: 101
      },
      {
        UserId: 3,
        UserName: 'Carlos Ruiz',
        UserEmail: 'carlos.ruiz@empresa.com',
        UserRole: 'Support',
        UserPassword: 'Carlos789!',
        UserIdentification: '456789123',
        CompanyCode: 102
      }
    ];
    acciones: Record<string, (id: number) => void> = {
      edit: (id: number) => this.editarUsuario(id), 
      delete: (id: number) => this.eliminarUsuario(id), 
    };

    openDialog(actionV: string,id: number){

      this.acciones[actionV]?.(id);
    }

    editarUsuario(id: number){
      this.dialogService.openDialog(FormUserComponent, 'Editar Usuario', { message: 'Hola desde A', action: "edit" } );
    }
    registrarUsuario(){
      this.dialogService.openDialog(FormUserComponent, 'Registrar Usuario', { message: 'Hola desde A', action: "add" } );
    }
    eliminarUsuario(id: number){
     alert(id)
    }
}
