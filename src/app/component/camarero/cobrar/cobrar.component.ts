import { Component, OnDestroy, OnInit } from '@angular/core';
import { CamareroService } from 'src/app/service/camarero.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.component.html',
  styleUrls: ['./cobrar.component.scss']
})
export class CobrarComponent implements OnInit, OnDestroy {

    mesas;
    mesa;
    detalles;
  constructor(private server:DatosService, private camarero:CamareroService) {
    this.mesas = this.camarero.nMesas;
    if(!this.mesas){
        this.server.getNumeroMesas().subscribe(
            data => {
                this.mesas = data;
                console.log(data);
            },
            err => console.log(err));
    }
   }

  ngOnInit(): void {
   
  }

  ngOnDestroy():void{
    //   this.misub2.unsubscribe();
  }

  detallarMesa(mesa_id){
      this.mesa = this.mesas[mesa_id - 1];
      this.server.cobrar(mesa_id).subscribe(
          data => {this.detalles = data; console.log(data);},
          err => console.log(err)
      )
  }

  limpiarMesa(mesa_id){
        this.server.limpiar(mesa_id).subscribe(
        () => this.detallarMesa(mesa_id)
      )
  }
}
