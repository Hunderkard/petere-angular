import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['../../login/login.component.scss']
})
export class RequestResetComponent implements OnInit {

  formulario:FormGroup;

  // fu Errores
  public error = null;

  constructor(private server:DatosService) { 

    this.formulario = new FormGroup({
      email: new FormControl('',  [ Validators.required,
                                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])
  })
}
  
  ngOnInit(): void {
  }

  onSubmit(){
    this.server.sendEmailPassReset(this.formulario)
    .subscribe(
      data => this.manejoRespuesta(data),
      error => console.log(error)
    );
  }

  manejoRespuesta(res){
    console.log(res);
  }

  manejoError(){}
}
