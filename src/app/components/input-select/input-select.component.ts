import { Component, forwardRef, Input} from '@angular/core';

import { SelectOption } from 'app/models/TblItem.model';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent implements ControlValueAccessor   {
  @Input() options: SelectOption[] = [];
  selectedValue: string = '';
  @Input() placeholder!: string;
   @Input() labelName!: string;

  private onChange = (value: any) => {};
  private onTouched = () => {};


  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.onChange(this.selectedValue);
    this.onTouched();
  }

  writeValue(value: any): void {
   this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
   
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
