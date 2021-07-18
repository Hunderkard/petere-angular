import { Component } from '@angular/core';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-vis-proveedores',
  templateUrl: './vis-proveedores.component.html',
  styleUrls: ['../vis-ingredientes/vis-ingredientes.component.scss']
})
export class VisProveedoresComponent {

  proveedores= null; 
  tokenErr = false;
  filtroNombre = '';
  imgUrl = "http://localhost:8000/storage/imagenes/proveedor/";

  constructor(private server:DatosService) { 
    this.server.getProveedores().subscribe(
      data => {
          this.proveedores = data;
        },
      err => console.error(err)
    )
  }


}
