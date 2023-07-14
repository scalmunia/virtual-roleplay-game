import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addSignFilter' })
export class AddSignFilter implements PipeTransform {
  transform(value: number): string {
    if (value === undefined || value === null) {
      return '';
    }
    
    return value >= 0 ? `+${value}` : `${value}`;
  }
}