import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantidad'
})
export class CantidadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
