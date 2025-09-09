import { Component, Inject, OnInit } from '@angular/core';
import { SelectOption } from '../../models/TblItem.model';
import { ConfigurationService } from '../../services/configuration.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SharedService } from 'app/services/shared.service';
import { INFO_CLASS } from 'app/utils/constanst';
import { InputSelectComponent } from 'app/components/input-select/input-select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-status',
  imports: [CommonModule, InputSelectComponent, ReactiveFormsModule],
  templateUrl: './form-status.component.html',
  styleUrl: './form-status.component.css',
})
export class FormStatusComponent implements OnInit {
  options: SelectOption[] = [];
  actionForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private configurationServices: ConfigurationService,
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private sharedServices: SharedService
  ) {}
  ngOnInit(): void {
    this.getStatus();
    
    this.buildForm();
  }
  getStatus() {
    const status = this.configurationServices.Status;
    this.options = Object.entries(status).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  }
  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      RepairStatus: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }
  submitForm() {
    if (this.actionForm.invalid) {
      this.sharedServices.showSnackbar('Elija un status', 'Info', INFO_CLASS);
      return;
    }
    const isDone = this.actionForm.value.RepairStatus === 'completado';

    this.dialogRef.close({
      doneRepair: isDone,
      RepairStatus: {
        RepairStatus: this.actionForm.value.RepairStatus,
      },
    });
  }
}
