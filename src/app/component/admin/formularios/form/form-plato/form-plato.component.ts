import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-form-plato',
  templateUrl: './form-plato.component.html',
  styleUrls: ['./form-plato.component.scss']
})
export class FormPlatoComponent {
 
  formulario:FormGroup;
  archivo:File = null;
  imgUrl:string = null;
  listaIngredientes = [];
  costeFinal = 0;

  constructor(private server:DatosService, private router:Router,  private fb:FormBuilder) { 
    this.formulario = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      coste: new FormControl(0, []),
      descripcion: new FormControl('', []),
      ingredientes: new FormArray([], []),
      foto: new FormControl()
      });
      
      this.server.getIngredientes().subscribe(
        data => { // ps Descargas todos los ingredientes para los select.
          for (const ing in data) {
            if (Object.prototype.hasOwnProperty.call(data, ing)) {
              const element = data[ing];
              this.listaIngredientes.push(
                [element.id, element.nombre, element.valor, element.unidad_de_medida])
            }
          }
        },
        err => console.error(err),
        () => {
          this.listaIngredientes.sort( 
          (a, b) => {
            if((a[1]) > (b[1])) return 1;
            else if((a[1]) < (b[1])) return -1;
            else return 0;
          });
        }
      )
  }

  onSubmit(){
   console.log(this.formulario.controls.value);
    this.server.createPlato(this.formulario, this.archivo, this.formulario.controls.foto.pristine).subscribe(
      data => console.log(data),
      err => console.error(err),
     () => this.router.navigateByUrl('/admin/platos')
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
  

/*
 
  /$$$$$$$$ /$$$$$$  /$$$$$$$  /$$      /$$        /$$$$$$  /$$$$$$$  /$$$$$$$   /$$$$$$  /$$     /$$
 | $$_____//$$__  $$| $$__  $$| $$$    /$$$       /$$__  $$| $$__  $$| $$__  $$ /$$__  $$|  $$   /$$/
 | $$     | $$  \ $$| $$  \ $$| $$$$  /$$$$      | $$  \ $$| $$  \ $$| $$  \ $$| $$  \ $$ \  $$ /$$/ 
 | $$$$$  | $$  | $$| $$$$$$$/| $$ $$/$$ $$      | $$$$$$$$| $$$$$$$/| $$$$$$$/| $$$$$$$$  \  $$$$/  
 | $$__/  | $$  | $$| $$__  $$| $$  $$$| $$      | $$__  $$| $$__  $$| $$__  $$| $$__  $$   \  $$/   
 | $$     | $$  | $$| $$  \ $$| $$\  $ | $$      | $$  | $$| $$  \ $$| $$  \ $$| $$  | $$    | $$    
 | $$     |  $$$$$$/| $$  | $$| $$ \/  | $$      | $$  | $$| $$  | $$| $$  | $$| $$  | $$    | $$    
 |__/      \______/ |__/  |__/|__/     |__/      |__/  |__/|__/  |__/|__/  |__/|__/  |__/    |__/    
                                                                                                     
                                                                                                     
                                                                                                     
 
*/

  agregar(){      
      (<FormArray>this.formulario.get('ingredientes')).push(new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        cantidad: new FormControl(0, [Validators.required]),
        coste: new FormControl(0 ,[])
      }, []));
  }
  borrar(index){
    (<FormArray>this.formulario.get('ingredientes')).removeAt(index);  
  }

/*
 
   /$$$$$$  /$$   /$$ /$$   /$$ /$$$$$$ /$$       /$$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$$$  /$$$$$$ 
  /$$__  $$| $$  | $$| $$  / $$|_  $$_/| $$      |_  $$_/ /$$__  $$| $$__  $$| $$_____/ /$$__  $$
 | $$  \ $$| $$  | $$|  $$/ $$/  | $$  | $$        | $$  | $$  \ $$| $$  \ $$| $$      | $$  \__/
 | $$$$$$$$| $$  | $$ \  $$$$/   | $$  | $$        | $$  | $$$$$$$$| $$$$$$$/| $$$$$   |  $$$$$$ 
 | $$__  $$| $$  | $$  >$$  $$   | $$  | $$        | $$  | $$__  $$| $$__  $$| $$__/    \____  $$
 | $$  | $$| $$  | $$ /$$/\  $$  | $$  | $$        | $$  | $$  | $$| $$  \ $$| $$       /$$  \ $$
 | $$  | $$|  $$$$$$/| $$  \ $$ /$$$$$$| $$$$$$$$ /$$$$$$| $$  | $$| $$  | $$| $$$$$$$$|  $$$$$$/
 |__/  |__/ \______/ |__/  |__/|______/|________/|______/|__/  |__/|__/  |__/|________/ \______/ 
                                                                                                 
                                                                                                 
                                                                                                 
 
*/

  tasar(fg){
    let corte = fg.value['nombre'].lastIndexOf("|");
    let coste = fg.value['nombre'].slice(corte + 1);
    let unidades = fg.get('cantidad').value;
  
    this.formulario.get('coste').setValue(this.costeFinal);
    fg.get('coste').setValue((coste * unidades).toFixed(2));
  }

  calcularCosteFinal(){
    this.costeFinal=0;
    this.formulario.get('ingredientes')['controls'].forEach(fg => {
        this.costeFinal += (fg.value['coste']/1);
    });

    this.formulario.get('coste').setValue(this.costeFinal.toFixed(2));
  }

}
