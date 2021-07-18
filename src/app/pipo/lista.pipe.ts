import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipoLista'
})
export class ListaPipe implements PipeTransform {

  transform(value, args: any[]): any {
    if(args.length < 1) return value;
    let lista = [];
    for (const obj of value) {
      if(obj[0][3] == args) lista.push(obj);
    }
    
    return lista;
  }

}
