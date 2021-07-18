import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  formulario:FormGroup;

  constructor( private server:DatosService, private router:Router) {
      this.formulario = new FormGroup({
        nombre: new FormControl('',[Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required]),
        level: new FormControl('', [Validators.required])
      })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.server.createUser(this.formulario).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this.router.navigateByUrl('admin/users')
    )
  }

}
