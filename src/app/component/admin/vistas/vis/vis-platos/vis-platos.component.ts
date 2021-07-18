import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-vis-platos',
  templateUrl: './vis-platos.component.html',
  styleUrls: ['../vis-ingredientes/vis-ingredientes.component.scss']
})
export class VisPlatosComponent implements OnInit {

  platos = null;
  filtroNombre = '';
  constructor(private server:DatosService) { }

  ngOnInit(): void {
    this.server.getPlatos().subscribe(
      data =>{
        console.log(data);
        this.platos = data} ,
      err => console.error(err)
    )
  }

}
