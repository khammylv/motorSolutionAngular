import { Pipe, PipeTransform,Injectable  } from '@angular/core';

@Pipe({
  name: 'removeLetters',
  standalone: true
})
@Injectable({ providedIn: 'root' }) 
export class RemoveLettersPipe implements PipeTransform {

  transform(value: string, shouldRemove: boolean): string  {
    if (!value) {
      return '';
    }
     if (typeof value !== 'string') {
    return value; 
  }
    
    if (shouldRemove) {
      return value.replace(/\D/g, "");
    }

    return value;
    
  }
}
