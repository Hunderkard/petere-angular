import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipoNombre'
})
export class NombrePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg.length < 3) return value;
    const resultado = [];
    for (const objeto of value) {
      if(objeto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
       resultado.push(objeto);
      }
    };
    return resultado;
  }

}
