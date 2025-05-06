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
    
    if (shouldRemove) {
      console.log("pipe => ", value)
      return value.replace(/\D/g, "");
    }

    return value;
    
  }
}
