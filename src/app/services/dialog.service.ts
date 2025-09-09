import { Injectable, Injector } from '@angular/core';
import { MatDialog ,MatDialogRef } from '@angular/material/dialog';
import { DynamicDialogComponent } from 'app/components/dynamic-dialog/dynamic-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private injector: Injector) {}
  /*openDialog(component: any, title: string, data: any = {}) {
    const injector = Injector.create({
      providers: [{ provide: 'dialogData', useValue: data }],
      parent: this.injector,
    });

    return this.dialog.open(DynamicDialogComponent, {
      width: '500px',
      data: {
        title,
        component,
        injector,
      },
    });
  }*/
    openDialog(component: any, title: string, data: any = {},width: string = '30vw') {
      const dialogRef = this.dialog.open(DynamicDialogComponent, {
         width: width,
         maxWidth: 'none',
        data: {
          title,
          component,
          injector: null
        },
      });
    
      const injector = Injector.create({
        providers: [
          { provide: 'dialogData', useValue: data },
          { provide: MatDialogRef, useValue: dialogRef }
        ],
        parent: this.injector,
      });
    
      dialogRef.componentInstance.data.injector = injector;
    
      return dialogRef;
    }
    
}
