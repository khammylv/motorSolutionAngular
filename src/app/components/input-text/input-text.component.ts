import { Component,Input ,forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RemoveLettersPipe } from 'app/pipes/remove-letters.pipe';

@Component({
  selector: 'app-input-text',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor{
  @Input()  placeholder!: string;  
  @Input() isNumber! : boolean;
  @Input() text!: string;

  
  private onChange = (value: any) => {};
  private onTouched = () => {};
  constructor(private removeLettersPipe: RemoveLettersPipe) {}

  onTextInput(event: Event): void {
    //this.text = event.target.value;
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    const cleanValue = this.removeLettersPipe.transform(rawValue, this.isNumber);
    input.value = cleanValue;
    this.text = cleanValue;
    //console.log("onChanche =>",this.text);
    this.onChange(this.text);
    this.onTouched();
  }

  // ControlValueAccessor methods:
  writeValue(value: any): void {
    this.text = this.removeLettersPipe.transform(value, this.isNumber);
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
