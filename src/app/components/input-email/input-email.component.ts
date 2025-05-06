import { CommonModule } from '@angular/common';
import { Component,forwardRef,Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputEmailComponent),
      multi: true
    }
  ]
})
export class InputEmailComponent implements ControlValueAccessor{
  @Input()  placeholder!: string;
  value: string = '';
  isValid: boolean = true;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  onTextInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.validateEmail();
    if (this.isValid) {
      this.onChange(this.value);
      this.onTouched();
    }
  }
  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValid = this.value.trim() !== '' && emailPattern.test(this.value);
  }

   // ControlValueAccessor methods:
   writeValue(value: any): void {
    this.value = value;
   
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
