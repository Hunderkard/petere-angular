import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';


@Component({
  selector: 'app-form-ingrediente',
  templateUrl: './form-ingrediente.component.html',
  styleUrls: ['./form-ingrediente.component.scss']
})
export class FormIngredienteComponent {
/* Sun-27/12 03:11:57 Para poner los nuevos ingredientes. */
  formulario:FormGroup;
  archivo: File = null;
  imgUrl:string = null; //ps Para la imagen mientras el formulario.
  proveedores=null;

  constructor( private server:DatosService, private route:Router) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [ Validators.required]),
      precio: new FormControl('', [ Validators.required]),
      proveedor: new FormControl('', [ Validators.required]),
      // fecha_compra: new FormControl('', [ Validators.required]),
      // fecha_caducidad: new FormControl('', []),
      cantidad: new FormControl('', [ Validators.required]),
      unidad: new FormControl('', [Validators.required]),
      observaciones: new FormControl('', []),
      foto: new FormControl(),
    });
    
    this.server.getProveedores().subscribe(
      data => this.proveedores = data,
      err => console.error(err)
    )
  }
   
  onSubmit(){
  this.server.createIngrediente(this.formulario, this.archivo, this.formulario.controls.foto.pristine).subscribe(
      data => {
        console.log(data);
        this.route.navigateByUrl('/admin/ingredientes');
      },
      error => console.error(error),
    );
  }

//Para ver la imagen en el front.
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

}
