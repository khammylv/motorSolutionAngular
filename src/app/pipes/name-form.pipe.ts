import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameForm'
})
export class NameFormPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Editar' : 'Registrar';
  }

}
