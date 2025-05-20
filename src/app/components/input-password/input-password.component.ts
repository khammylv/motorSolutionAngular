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
  isValid: boolean = true;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
 
  onPasswordInput(event: any): void {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
    this.validatePassword();
    if (this.isValid) {
      this.onChange(this.password);
      this.onTouched();
    }
  }
  validatePassword() {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.isValid = regex.test(this.password)
    //return regex.test(cadena);
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
