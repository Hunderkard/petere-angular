import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-show-proveedor',
  templateUrl: './show-proveedor.component.html',
  styleUrls: ['./show-proveedor.component.scss']
})
export class ShowProveedorComponent implements OnInit {

  proveedor:any={
    "nombre":"Cargando",
    "foto":"sin_imagen.png",
  };
  id = null;
  imgServer = 'http://localhost:8000/storage/imagenes/proveedor/';
  imgUrl = this.imgServer + this.proveedor.foto;

  constructor(private server:DatosService, private route:ActivatedRoute, private router:Router) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.server.getProveedor(this.id).subscribe(
      data => {this.proveedor = data; 
      this.imgUrl = this.imgServer + this.proveedor.foto;}
    )
  }

  onDelete(){
    this.server.deleteProveedor(this.id).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl('/proveedores')
    );
  }

}
