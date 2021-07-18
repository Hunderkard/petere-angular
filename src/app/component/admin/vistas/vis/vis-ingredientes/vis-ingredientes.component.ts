import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-vis-ingredientes',
  templateUrl: './vis-ingredientes.component.html',
  styleUrls: ['./vis-ingredientes.component.scss']
})
export class VisIngredientesComponent implements OnInit{

  ingredientes = null;
  filtroNombre = '';
  urlImagenes = 'http://localhost:8000/storage/imagenes/';

  constructor(private server:DatosService) {
     this.server.getIngredientes().subscribe(
      data => {this.ingredientes = data; console.log(data);},
      error => console.error(error)
    )
  }

  ngOnInit(){ 
  }

}
