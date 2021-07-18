import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {
  formulario:FormGroup;
  usuarios = null;
  usuario = null;
  id = null;

  constructor(private server:DatosService, private router:Router, private route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.formulario = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      mesa:new FormControl('', [Validators.min(0)]),
      level: new FormControl('',[Validators.required, Validators.max(4), Validators.min(0)]),
    });

  }

  ngOnInit(): void {
    this.server.getUsuarios().subscribe(
      data => this.usuarios = data, 
      err => console.error(err),
    )

    this.server.getUsuario(this.id).subscribe(
      data => this.usuario = data,
      err => console.error(err),
      () => {
        this.formulario.controls.nombre.setValue(this.usuario.name);
        this.formulario.controls.email.setValue(this.usuario.email);
        this.formulario.controls.mesa.setValue(this.usuario.mesa);
        this.formulario.controls.level.setValue(this.usuario.level);
      }
    )
  }

  onSubmit(){
    this.server.updateUsuario(this.formulario, this.id).subscribe();
    this.router.navigateByUrl('/admin/users');
  }

  navegar(number){
    
    this.id = number;
    
    this.formulario.controls.nombre.setValue('Cargando...');
    this.formulario.controls.email.setValue('Cargando...');
    this.formulario.controls.level.setValue('0');
    
    this.server.getUsuario(this.id).subscribe(
      data => this.usuario = data,
      err => console.error('OJO: ' + err),
      () => {
        this.formulario.controls.nombre.setValue(this.usuario.name);
        this.formulario.controls.email.setValue(this.usuario.email);
        this.formulario.controls.level.setValue(this.usuario.level);
      }
    )
    this.router.navigateByUrl('/admin/user/' + number);
  }
}
