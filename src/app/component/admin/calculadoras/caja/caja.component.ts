import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit, OnDestroy {

    registros;
    sub;
  constructor(private sever:DatosService) {
       this.sub = this.sever.caja().subscribe(
          data => this.registros = data,
          err => console.log(err),
          () => console.log(this.registros)
      )
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

}
