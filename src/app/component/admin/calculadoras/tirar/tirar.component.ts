import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-tirar',
  templateUrl: './tirar.component.html',
  styleUrls: ['./tirar.component.scss']
})
export class TirarComponent implements OnInit {

 
  ingredientes = [];
  formulario:FormGroup;

  constructor(private server:DatosService, private router:Router) {
    this.formulario = new FormGroup({
      perdidas: new FormArray([],[])
    })
   }

  ngOnInit(): void {
    this.server.getIngredientes().subscribe(
      data => {
        for (const ing in data) {
          if (Object.prototype.hasOwnProperty.call(data, ing)) {
            const element = data[ing];
            this.ingredientes.push(
              [element.nombre, element.unidad_de_medida, element.id])
          }
        }
      },
      err => console.log(err),
      () => {this.ingredientes.sort( (a,b) => {
        if(a[0] > b[0]) return 1;
        else if(a[0] < b[0]) return -1;
        else return 0;
      });
      }
    )
  }

  onSubmit(){
    console.log(this.formulario);
    this.server.dropStock(this.formulario).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl("/admin/ingredientes")
    );
  }

  agregar(){      
    (<FormArray>this.formulario.get('perdidas')).push(new FormGroup({
      id: new FormControl('', [Validators.required]),
      cantidad: new FormControl(0, [Validators.required])
    }, []));
  }

  borrar(index){
    (<FormArray>this.formulario.get('perdidas')).removeAt(index);  
  }

}
