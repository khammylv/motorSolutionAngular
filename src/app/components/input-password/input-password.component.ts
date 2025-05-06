import { Component,Input , Output, EventEmitter,forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-input-password',
  imports: [CommonModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ]
})
export class InputPasswordComponent implements ControlValueAccessor{
  @Input()  placeholder!: string;  


  password!: string;
  showPassword: boolean = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onPasswordInput(event: any): void {
    this.password = event.target.value;
    //console.log(event.target.value);
    this.onChange(event.target.value);
    this.onTouched();
  }

  // ControlValueAccessor methods:
  writeValue(value: any): void {
    this.password = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }
}
