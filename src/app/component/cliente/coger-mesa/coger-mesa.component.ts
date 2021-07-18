import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { DatosService } from 'src/app/service/datos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-coger-mesa',
  templateUrl: './coger-mesa.component.html',
  styleUrls: ['./coger-mesa.component.scss']
})
export class CogerMesaComponent implements OnInit {
  formulario:FormGroup;
  usuario;  // ti Del token.
  mesado;

  constructor(
      private canal:ChatService,
      private server:DatosService, 
      private token:TokenService, 
      private auth:AuthService,
      private router:Router) {

      // ti Acceso al token.
      this.usuario = this.token.getUsuario();

      this.auth.authMesado.subscribe(data => this.mesado = data);
      // Crear el formulario.
      this.formulario = new FormGroup({
        numero: new FormControl('',[]),
        codigo: new FormControl('',[])
    });
   }

  ngOnInit(): void {

    this.server.getMesaUsuario(this.usuario).subscribe(
      data => {
        if(data[0]){
          this.auth.cambiaMesaAuth(data[0]);
          // no Si tiene una mesa, avisa a cocina.
          this.canal.ocupan_mesa(data[0]);
        };
      },
      err => console.log(err),
    )
  }

//   onSubmit(){

//      // pl Comprueba que existe la mesa y coincide la contraseña.    
//     this.server.checkMesa(this.formulario).subscribe(
//       data => {
//         if(data){
//       // no Ocupan la mesa, pasando el número. Esto colorea en la vista de cocina.
//           this.canal.ocupan_mesa(this.formulario.controls.numero.value);
//           this.auth.cambiaMesaAuth(this.formulario.controls.numero.value);
//       // pl Esto modifica la BD, poniéndole al usuario el número de la mesa.
//           this.server.updateMesaUsuario(this.token.getUsuario(), this.formulario.controls.numero.value).subscribe(
//             () => this.router.navigateByUrl('/carta'),
//           );
//         }
//       },
//       err => console.log(err)
//     )

//   }

  capturedQr(result: string) {
    console.log(result);
    let numero = result.split('%')[0];
    let codigo = result.split('%')[1];
    this.formulario.setValue({
        numero: numero,
        codigo: codigo
    })
    if(!numero || !codigo){
        console.log("LECTURA ERRONEA");
        return false;
    }
    console.log(this.formulario.value);
    this.server.checkMesa(this.formulario).subscribe(
        data => {
            if(data){
        // no Ocupan la mesa, pasando el número. Esto colorea en la vista de cocina.
            this.canal.ocupan_mesa(this.formulario.controls.numero.value);
            this.auth.cambiaMesaAuth(this.formulario.controls.numero.value);
        // pl Esto modifica la BD, poniéndole al usuario el número de la mesa.
            this.server.updateMesaUsuario(this.token.getUsuario(), this.formulario.controls.numero.value).subscribe(
                () => this.router.navigateByUrl('/carta'),
            );
            }
        },
        err => console.log('Esa mesa no existe.')
    )
  }

  abandonarMesa(){
    // pl Lo borramos en la base de datos.
    this.server.updateMesaUsuario(this.usuario).subscribe(
      data => this.auth.cambiaMesaAuth(),
      err => console.log(err),
    );
    // no Mandamos el mensaje de que abandonamos la mesa.
    this.canal.abandonan_mesa(this.mesado);
    
  }

}
