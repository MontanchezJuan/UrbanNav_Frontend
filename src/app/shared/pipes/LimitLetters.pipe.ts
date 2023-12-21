import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitLetters',
})
export class LimitLetters implements PipeTransform {
  transform(value: string, limite: number): string {
    if (value.length > limite) {
      return value.substring(0, limite) + '...';
    }
    return value;
  }
}
