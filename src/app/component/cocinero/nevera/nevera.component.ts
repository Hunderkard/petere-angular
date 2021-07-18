import { Component } from '@angular/core';
import { CocinaService } from 'src/app/service/cocina.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-nevera',
  templateUrl: './nevera.component.html',
  styleUrls: ['./nevera.component.scss']
})
export class NeveraComponent {

  
  ingredientes = null;
  orden = false;

  constructor(private cocina:CocinaService) {
      // hi NUEVO SERVICIO COCINA
//     this.server.getIngredientes().subscribe(
//      data => {
//        this.ingredientes = data;
//        this.ingredientes.sort( (a ,b) => {
//          if(a.stock < b.stock) return -1;
//          else if(a.stock > b.stock) return 1;
//          else return 0;
//        })
//      },
//      error => console.error(error)
//    );
     // hi #########################

    this.ingredientes = this.cocina.getIngredientes();

 }

 ordenar(){
  this.orden = !this.orden;

  if(this.orden){
    this.ingredientes.sort( (a,b) => {
      if(a.stock < b.stock) return 1;
      else if(a.stock > b.stock) return -1;
      else return 0;
    });
  } 
  else{
    this.ingredientes.sort( (a ,b) => {
      if(a.stock < b.stock) return -1;
      else if(a.stock > b.stock) return 1;
      else return 0;
    });
  }
 }

}
