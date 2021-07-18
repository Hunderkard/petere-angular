import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/service/chat.service';
import { CocinaService } from 'src/app/service/cocina.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit, OnDestroy {

  platos=[];
  pedidos_obj=[];
  pedidos_arr=[];
  numeroMostrado = 0;
//   mesas_ocupadas;
  sub1;
  sub2;
  detalleMesa = 0;

 constructor(private canal:ChatService,
            private cocina:CocinaService,) {
    // if(this.galletitas.check('pedidos')){
    //   this.pedidos_obj = JSON.parse(this.galletitas.get('pedidos'));
    //   if(this.pedidos_obj[0]) this.bloquear_pedido(this.pedidos_obj[0].mesa);
    // }
    // console.log("Constructor lista_pedidos ");
  }

  
ngOnInit(): void {
    // pl DESCARGAR LOS PLATOS.
    this.platos = this.cocina.platos;

    this.pedidos_arr = this.cocina.pedidos_arr;
    this.sub1 = this.canal.anotando_pedidos().subscribe(
        (data:any[]) => {
            let i = 0;
            data.forEach(element => {
                this.pedidos_arr[i++] = this.obj2arr(element);
            });
            
            // console.log(this.pedidos_arr);
    },
        err => { console.log(err)}
    );

}
ngOnDestroy(){
    this.sub1.unsubscribe();
    // this.sub2.unsubscribe();
}

pintar(orden){
    if(typeof(orden) == "object"){
        let estado = orden[1] ? "azul" : "rojo";
        return [true, orden[0], estado];
    }
    else{
        return [false, orden]
    }
}
expandido(orden){
    if(typeof(orden) == "object"){
        let nombre = this.platos.find((a)=>  a.id == orden[0])
        return [true, nombre.nombre];
    }
    else{
        return [false,orden];
    }
}

sacar(arr, nombre, index){
  // ps OBJ[ID] = CANT;
  // ps OBJ["MESA"];
  let mesa = arr[arr.length - 1];
  console.log(mesa, nombre, index);

    // this.sub2 = this.server.anotar(obj["mesa"], id).subscribe(
    //     data => console.log(data)
    // );

    this.canal.listo_pedido([mesa, nombre, null, index, false]);
    // this.galletitas.set('pedidos', JSON.stringify(this.pedidos_obj));

}

traer(arr, nombre, index){
    // ps OBJ[ID] = CANT;
    // ps OBJ["MESA"];
    let mesa = arr[arr.length - 1];
    console.log(mesa, nombre, index);
  
      // this.sub2 = this.server.anotar(obj["mesa"], id).subscribe(
      //     data => console.log(data)
      // );
  
      this.canal.listo_pedido([mesa, nombre, null, index, true]);
      // this.galletitas.set('pedidos', JSON.stringify(this.pedidos_obj));
  
  }
  

mover(de, a = 0) {
    let mesaNo = this.pedidos_arr[de][this.pedidos_arr[de].length - 1];
    this.bloquear_pedido(mesaNo);
    if(this.pedidos_arr.length > 1){
    this.numeroMostrado = de;
  }
  // else {
  //   console.log("No hay más trabajo.");
  // }
  
}

long(obj){
  return 2 > Object.keys(obj).length;
}

eliminar(arr){
    let mesa = arr[arr.length - 1];
    let kitLimpieza = ['limpiar', mesa];
    this.canal.mandan_pedido(kitLimpieza);
    this.pedidos_arr.splice(this.numeroMostrado ,1);
    this.desbloquear_pedido(mesa);
    console.log(this.pedidos_arr);

}

bloquear_pedido(mesa){
    console.log("Bloqueada mesa " + mesa);
    this.canal.bloquear_mesa(mesa);
}

desbloquear_pedido(mesa){
    console.log(mesa);
    // console.log("Desbloqueada mesa " + obj[0].mesa);
    this.canal.desbloquear_mesa(mesa);
}

seleccionarMesa(event){
    this.detalleMesa = event;
    console.log(this.detalleMesa + " desde el padre.");
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

// iterable(num){
//     let iterable = [];   
//     for (let index = 0; index < num; index++) {
//     iterable.push(1); 
//     }
//     return iterable;
// }
}
