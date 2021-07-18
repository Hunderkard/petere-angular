import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-edit-ingrediente',
  templateUrl: './edit-ingrediente.component.html',
  styleUrls: ['./edit-ingrediente.component.scss']
})
export class EditIngredienteComponent implements OnInit {

  formulario:FormGroup; 
  archivo: File = null;
  serverImg = 'http://localhost:8000/storage/imagenes/ingrediente/';
  id = null;    // vo De la URL cogerá el ID para el GET y el PUT
  ingrediente:any = {
    "nombre": 'Cargando',
    "precio": 0.00,
    "observaciones": 'Cargando...',
    "stock": 0,
    "unidad": 'cargando',
    "foto": 'sin_imagen.png'
  };
  imgUrl:string = this.serverImg + this.ingrediente.foto; 

  constructor(private route:ActivatedRoute, private router:Router, private server:DatosService) { 
    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      precio: new FormControl('',[Validators.required]),
      stock: new FormControl('',[Validators.required]),
      unidad: new FormControl('',[Validators.required]),
      observaciones: new FormControl('',[]),
      foto: new FormControl('',[])
    })
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.server.getIngrediente(this.id).subscribe(
      data =>{
        this.ingrediente = data;
        this.formulario.controls['nombre'].setValue(this.ingrediente.nombre);
        this.formulario.controls['precio'].setValue(this.ingrediente.valor);
        this.formulario.controls['stock'].setValue(this.ingrediente.stock);
        this.formulario.controls['unidad'].setValue(this.ingrediente.unidad_de_medida);
        this.formulario.controls['observaciones'].setValue(this.ingrediente.observaciones);
        this.imgUrl= this.serverImg + this.ingrediente.foto; 
      },
      err => console.error(err)
    )
  }

  onSubmit(){
    this.server.updateIngrediente(this.formulario, this.archivo, this.id, this.formulario.controls.foto.pristine).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl('/admin/ingredientes')
    )
  }

  onChange(event){
    let files: FileList = event.target.files;
    this.archivo = files.item(0);

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      // const [file] = event.target.files;
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
