import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-edit-plato',
  templateUrl: './edit-plato.component.html',
  styleUrls: ['./edit-plato.component.scss']
})
export class EditPlatoComponent implements OnInit {

    formulario:FormGroup;
    archivo: File = null;
    serverImg = 'http://localhost:8000/storage/imagenes/plato/';
    id = null;
    listaIngredientes = [];
    plato:any = {
      "nombre": 'Cargando',
      "precio": 0.00,
      "observaciones": 'Cargando...',
      "foto": 'sin_imagen.png'
    }
    imgUrl:string = this.serverImg + this.plato.foto; 

  constructor(private route:ActivatedRoute, private router:Router, private server:DatosService) { 
      this.formulario = new FormGroup({
      nombre: new FormControl('',[]),
      precio: new FormControl('',[]),
      observaciones: new FormControl('',[]),
      foto: new FormControl('',[]),
      ingredientes: new FormArray([],[])
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.server.getPlato(this.id).subscribe(
      data => {
        this.plato = data;
        this.formulario.controls['nombre'].setValue(this.plato.nombre);
        this.formulario.controls['precio'].setValue(this.plato.precio.toFixed(2));
        this.formulario.controls['observaciones'].setValue(this.plato.observaciones);
        this.imgUrl = this.serverImg + this.plato.foto;
      },
      err => console.error(err)
    );
    this.server.getReceta(this.id).subscribe(
      data => {
        for (const ing in data) {
          if (Object.prototype.hasOwnProperty.call(data, ing)) {
            (<FormArray>this.formulario.get('ingredientes')).push(new FormGroup({
              nombre: new FormControl(ing, [Validators.required]),
              cantidad: new FormControl(data[ing], [Validators.required])
            }, []));
          }
        }
      },
      err => console.error(err)
    );

    this.server.getIngredientes().subscribe(
      data => { // ps Descargas todos los ingredientes para los select.
        for (const ing in data) {
          if (Object.prototype.hasOwnProperty.call(data, ing)) {
            const element = data[ing];
            this.listaIngredientes.push(
              [element.id, element.nombre, element.unidad_de_medida])
          }
        }
      },
      err => console.error(err)
    )
    
  }

  onSubmit(){
    // console.log(this.formulario);
    this.server.updatePlato(this.formulario, this.archivo, this.id, this.formulario.controls.foto.pristine)
    .subscribe(
      (data)=>console.log(data),
      (err)=>console.log(err),
      ()=> this.router.navigateByUrl('/admin/platos')
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

  agregar(){      
    (<FormArray>this.formulario.get('ingredientes')).push(new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cantidad: new FormControl(0, [Validators.required])
    }, []));

    console.log(this.formulario);
  }

  borrar(index){
    (<FormArray>this.formulario.get('ingredientes')).removeAt(index);  
  }

  limpio(control){
    return control ? 'pristino' : 'tocado';
  }
}
