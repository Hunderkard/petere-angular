import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['../../login/login.component.scss']
})
export class ResponseResetComponent {

  formulario:FormGroup;
  public error = null;
 
  constructor(  private server:DatosService,
                private route:ActivatedRoute,
                private router: Router) { 


    this.formulario = new FormGroup({
      email: new FormControl('', [    Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [ Validators.required,
                                      Validators.minLength(6)]),
      repetida: new FormControl(),

      resetToken: new FormControl(),
    });

    this.formulario.controls.repetida.
    setValidators([
      Validators.required,
      this.noIguales.bind( this.formulario )
    ]);
    
    this.route.queryParams.subscribe(params => {
      this.formulario.controls.resetToken.setValue(params['token']);
    });

        console.log(this.formulario);
  }
 
   
   noIguales(input:FormControl):{[s:string]:boolean}{

    let form:any = this;

    if(input.value !== form.controls.password.value) return {diferentes:true}; /* Si hay algún retorno, es que hubo error. */
    return null;
  }

  onSubmit(){
    this.server.changePass(this.formulario)
    .subscribe(
      data => this.manejaRespuesta(data),
      error => this.manejaError(error)
    )
  }

  manejaRespuesta(data){
    this.router.navigateByUrl('/login');
  }

  manejaError(error){
    console.log(error);
  }
}
