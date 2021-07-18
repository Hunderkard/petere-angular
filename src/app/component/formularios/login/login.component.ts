import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

// ti SERVICIOS
import { DatosService } from 'src/app/service/datos.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario:FormGroup;
  public error = null;  

  // usuarioPrueba:Object = {
  //   email:"probando@gmail.com",
  //   password:"12341234"
  // }
 
  constructor(private server:DatosService, 
              private token:TokenService, 
              private auth:AuthService, 
              private router: Router) {

    this.formulario = new FormGroup({
      email: new FormControl('',    [ Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                    ]),
      password: new FormControl('', [ Validators.required,
                                      Validators.minLength(6)
                                    ])
    })
   }

  onSubmit(){
    console.log('Subiendo el formulario.')
    return this.server.login(this.formulario)
      .subscribe(
          data => this.manejoRespuesta(data),
          error => this.manejoError(error),
      );
  // this.formulario.setValue(this.usuarioPrueba);  // si Aquí se pasa un objeto con la misma estructura y listo.
  }

  manejoRespuesta(res){
    this.token.set(res.token);
    this.auth.cambiaStatusAuth(true);
    this.auth.cambiaLevelAuth();
    this.router.navigateByUrl('/home');
  }

  manejoError(e){
    this.error = e.status;
  }

}