import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ti SERVICIOS
import { DatosService } from 'src/app/service/datos.service';
// import { TokenService } from 'src/app/service/token.service';
// import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent {

  formulario:FormGroup;
  public error = null;
 
  constructor( private server:DatosService,
                // private token:TokenService,
                // private auth:AuthService,
                private router:Router) {

    this.formulario = new FormGroup({
      nombre: new FormControl('', [   Validators.required,
                                      Validators.minLength(4)]),
      email: new FormControl('', [    Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [ Validators.required,
                                      Validators.minLength(6)]),
      repetida: new FormControl()

    })
    
    this.formulario.controls.repetida.
    setValidators([
      Validators.required,
      this.noIguales.bind( this.formulario )
    ])
   }

  noIguales(input:FormControl):{[s:string]:boolean}{

    let form:any = this;

    if(input.value !== form.controls.password.value) return {diferentes:true}; /* Si hay algún retorno, es que hubo error. */
    return null;
  }

   onSubmit(){ 
    console.log('Subiendo el formulario.')
    return this.server.register(this.formulario)
      .subscribe(
          data => this.manejoRespuesta(data),
          error => this.manejoError(error),
      );
  }

   manejoRespuesta(res){
    console.log("Entró bien. Manejando respuesta.");
    // this.token.set(res.token);
    // this.auth.cambiaStatusAuth(true);
    this.router.navigateByUrl('/login');
  }
  
  manejoError(e){
    console.log("Entró mal");
    console.log(e);
    this.error = e.status;
  }
}