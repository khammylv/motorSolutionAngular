import { Injectable, Injector  } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../components/dynamic-dialog/dynamic-dialog.component';
@Injectable({
    providedIn: 'root'
  })
  export class DialogService {
    constructor(private dialog: MatDialog, private injector: Injector) {}
    openDialog(component: any, title: string, data: any = {}) {
        const injector = Injector.create({
            providers: [{ provide: 'dialogData', useValue: data }],
            parent: this.injector
          });

          return this.dialog.open(DynamicDialogComponent, {
            width: '500px',
            data: {
              title,
              component,
              injector,
              
            }
          }); 
    }
  }