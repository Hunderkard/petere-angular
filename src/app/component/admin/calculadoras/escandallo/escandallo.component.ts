import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-escandallo',
  templateUrl: './escandallo.component.html',
  styleUrls: ['./escandallo.component.scss']
})
export class EscandalloComponent implements OnInit {

  listaIngredientes = [];
  costeFinal = 0;
  beneficio = 0;
  formulario:FormGroup;


  constructor( private server:DatosService) {
      this.formulario = new FormGroup({
      coste: new FormControl(0, []),
      beneficio: new FormControl(0, []),
      precio: new FormControl(0, []),
      ingredientes: new FormArray([],[ ])
    })
   }

  ngOnInit(): void {
    this.server.getIngredientes().subscribe(
      data => {
        for (const ing in data) {
          if (Object.prototype.hasOwnProperty.call(data, ing)) {
            const element = data[ing];
            this.listaIngredientes.push(
              [element.nombre, element.valor, element.unidad_de_medida])
          }
        }
      },
      err => console.error(err)
    )
  }

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

tasar(fg){
  let coste = fg.value['nombre'];
  let unidades = fg.get('cantidad').value;

  this.formulario.get('coste').setValue(this.costeFinal);
  fg.get('coste').setValue((coste * unidades).toFixed(2));
}

calcularCosteFinal(){
  this.costeFinal=0;
  this.formulario.get('ingredientes')['controls'].forEach(fg => {
      this.costeFinal += (fg.value['coste']/1);
  });

  this.beneficio = (1 + this.formulario.value.beneficio/100);
  this.formulario.get('coste').setValue(this.costeFinal.toFixed(2));
  this.formulario.get('precio').setValue((this.costeFinal * this.beneficio).toFixed(2));
}

}
