import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { DatosService } from 'src/app/service/datos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-abandonar-mesa',
  templateUrl: './abandonar-mesa.component.html',
  styleUrls: ['./abandonar-mesa.component.scss']
})
export class AbandonarMesaComponent implements OnInit {

    mesado;
    usuario
  constructor(
    private canal:ChatService,
    private server:DatosService, 
    private token:TokenService, 
    private auth:AuthService,
    private router:Router) { 

        auth.authMesado.subscribe( data => this.mesado = data)
    }

  ngOnInit(): void {
    this.usuario = this.token.getUsuario();

  }

  abandonarMesa(){
    // pl Lo borramos en la base de datos.
    this.server.updateMesaUsuario(this.usuario).subscribe(
      data => this.auth.cambiaMesaAuth(),
      err => console.log(err),
    );
    // no Mandamos el mensaje de que abandonamos la mesa.
    console.log(this.mesado + ' abandona mesa.');
    this.canal.abandonan_mesa(this.mesado);
    this.router.navigateByUrl('mesa');
  }
}
