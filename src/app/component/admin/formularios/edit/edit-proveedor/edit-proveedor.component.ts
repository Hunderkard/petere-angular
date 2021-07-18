import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.scss']
})
export class EditProveedorComponent implements OnInit {

  formulario:FormGroup;
  archivo: File = null;
  serverImg = 'http://localhost:8000/storage/imagenes/proveedor/';
  id=null;
  proveedor:any={
    "nombre":'Cargando',
    "foto":'sin_imagen.png'
  }
  imgUrl = this.serverImg + this.proveedor.foto;

  constructor(private server:DatosService, private route:ActivatedRoute, private router:Router) {
    this.id = this.route.snapshot.paramMap.get('id');

    //ps Fuera constructor.
    //ps Dentro constructor.
    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      foto:new FormControl('', [])
    })
   }

  ngOnInit(): void {
    this.server.getProveedor(this.id).subscribe(
      data => {
        this.proveedor = data;
        this.formulario.controls['nombre'].setValue(this.proveedor.nombre);
        this.imgUrl= this.serverImg + this.proveedor.foto; 

      },
      err => console.error('OJO: ' + err)
    )
  }

  onSubmit(){

    this.server.updateProveedor(this.formulario, this.archivo, this.id, this.formulario.controls.foto.pristine).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl('/admin/proveedores')
    )
  }

  onChange(event){
    let files: FileList = event.target.files;
    this.archivo = files.item(0);

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      reader.readAsDataURL(this.archivo);

      reader.onload = () => {
        this.imgUrl = reader.result as string; //ps Para verlo en el angular.
      };
    }
  }

  limpio(control){
    return control ? 'pristino' : 'tocado';
  }
}
