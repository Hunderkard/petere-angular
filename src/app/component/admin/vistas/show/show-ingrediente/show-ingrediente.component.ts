import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';


@Component({
  selector: 'app-show-ingrediente',
  templateUrl: './show-ingrediente.component.html',
  styleUrls: ['./show-ingrediente.component.scss']
})
export class ShowIngredienteComponent implements OnInit{

  id = null;
  serverImg = 'http://localhost:8000/storage/imagenes/ingrediente/';
  ingrediente :any = {
    "nombre": 'Cargando',
    "valor": 0.00,
    "observaciones": 'Cargando...',
    "stock": 0,
    "unidad": 'cargando',
    "foto": 'sin_imagen.png'
  };
  urlImg = this.serverImg + this.ingrediente.foto;

  constructor( private route:ActivatedRoute, private server:DatosService, private router:Router) {}
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.server.getIngrediente(this.id).subscribe(
      data => {
        this.ingrediente = data;
        this.urlImg = this.serverImg + this.ingrediente.foto;
      },
      err => console.error(err)
    )
  }

  onDelete(){
    this.server.deleteIngrediente(this.id).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl('admin/ingredientes')
    );
  }
}
