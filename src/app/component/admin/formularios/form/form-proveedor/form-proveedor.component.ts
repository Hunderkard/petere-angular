import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.scss']
})
export class FormProveedorComponent {

  formulario:FormGroup;
  archivo: File = null;
  imgUrl = null;

  constructor(private server:DatosService, private router:Router) {  
    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required])
    });
   }

  onSubmit(){
    this.server.createProveedor(this.formulario, this.archivo).subscribe(
      data => {
        // console.log(data);
        this.router.navigateByUrl('/admin/proveedores')
      },
      err => console.error(err)
    )
  }

  onChange(event){

    let files: FileList = event.target.files;
    this.archivo = files.item(0);

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      reader.readAsDataURL(this.archivo);

      reader.onload = () => {
        this.imgUrl = reader.result as string;
      };
    }
  }

}
