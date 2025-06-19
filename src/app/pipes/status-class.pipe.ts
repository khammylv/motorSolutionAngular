import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusClass'
})
export class StatusClassPipe implements PipeTransform {

   transform(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completado':
        return 'bg-green-500/20 text-green-600';
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'cancelado':
        return 'bg-red-500/20 text-red-600';
      case 'en proceso':
        return 'bg-blue-500/20 text-blue-600';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  }

}
