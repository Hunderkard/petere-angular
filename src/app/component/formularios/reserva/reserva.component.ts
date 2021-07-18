import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent {
  formulario:FormGroup;
  

  constructor(private server:DatosService) {
      this.formulario = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required]),
        fecha: new FormControl('',[Validators.required]),
        personas: new FormControl('',[Validators.required]),
        hora: new FormControl('', [Validators.required]),
        email:new FormControl('', [Validators.required, 
                                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]),
        ruedas: new FormControl(false),
        carrito: new FormControl(false),
        alergias: new FormControl(false),
        alergia:new FormControl(''),
      });
  }



  onSubmit(){
    this.server.sendEmailReserva(this.formulario).subscribe(
      data => 
      {

      },
      err => console.log(err)
    )
  }

}
