import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-show-plato',
  templateUrl: './show-plato.component.html',
  styleUrls: ['./show-plato.component.scss']
})
export class ShowPlatoComponent implements OnInit {

  id = null;
  serverImg = 'http://localhost:8000/storage/imagenes/plato/';
  plato:any = {
    "nombre": 'Cargando',
    "precio": 0.00,
    "observaciones": 'Cargando...',
    "foto": 'sin_imagen.png'
  };
  ingredientes:any = [];
  urlImg = this.serverImg + this.plato.foto;

  constructor(private route:ActivatedRoute, private server:DatosService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.server.getPlato(this.id).subscribe(
      data => {
        this.plato = data;
        this.urlImg = this.serverImg + this.plato.foto;
      },
      err => console.error(err)
    )

    this.server.getReceta(this.id).subscribe(
      data => {
        for (const ing in data) {
          if (Object.prototype.hasOwnProperty.call(data, ing)) {
           this.ingredientes.push([ing, data[ing]]);
          }
        }
      },
      err => console.error(err),
      () => {this.ingredientes.sort((a,b)=>{
       if(a[1] < b[1]) return 1;
       else if( a[1] > b[1]) return -1;
       else return 0;
      })}
    )
  }

  onDelete(){
    this.server.deletePlato(this.id).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl('admin/platos')
    );
  }

}
