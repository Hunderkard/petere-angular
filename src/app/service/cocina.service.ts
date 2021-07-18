import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from './chat.service';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class CocinaService {
    unido= false;
    ingredientes;
    mesas_ocupadas;
    mesas_total;
    platos=[];
    pedidos_obj;
    pedidos_arr=[];

    completado=0;

  constructor(private server:DatosService, private canal:ChatService, private router:Router) { 
    if(!this.unido) {this.canal.unirse(); this.unido = true}
    this.canal.mesas.subscribe(data => {this.mesas_ocupadas = data;});
    this.canal.anotando_pedidos().subscribe((data:any[]) => {
        this.pedidos_obj = data
        let i = 0;
        data.forEach(element => {
            this.pedidos_arr[i++] = this.obj2arr(element);
        });
    });
// pl PLATOS
    this.server.getPlatos().subscribe(
        data => { console.log(data);
            for (const plato in data) {
            // if (Object.prototype.hasOwnProperty.call(data, plato)) {
            const element = data[plato];
            this.platos.push(element);
            // }
            };
            if(++this.completado == 3) {this.router.navigateByUrl('home')}
        },
        err => console.log(err),
    );
// pl INGREDIENTES
    this.server.getIngredientes().subscribe(
            data => { console.log(data);
              this.ingredientes = data;
              this.ingredientes.sort( (a ,b) => {
                if(a.stock < b.stock) return -1;
                else if(a.stock > b.stock) return 1;
                else return 0;
              });
              if(++this.completado == 3) {this.router.navigateByUrl('home')}

            },
            error => console.error(error)
    );
// pl NUMERO DE MESAS
    this.server.getNumeroMesas().subscribe(
        data =>{ 
            this.mesas_total = data; console.log(data);
            if(++this.completado == 3) {this.router.navigateByUrl('home')}

        },
        err => console.log(err)
    )
  }


  obj2arr(obj){
    let arr = [];
    let i = 0;
    for (const pedido in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, pedido)) {
            arr[i++] = obj[pedido];
            
        }
    }

    return arr;
}

  getIngredientes(){
    return this.ingredientes;
    }
  
}
