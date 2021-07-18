import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatService } from './chat.service';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class CamareroService {

unido= false;
mesas_ayudables;
platos_listos;
nMesas;
// srv_ayuda_en_mesa = false;

  constructor( private canal:ChatService, private server:DatosService) {
    if(!this.unido) {this.canal.unirse("camareros"); this.unido = true}
    this.canal.plato_para_mesa().subscribe(data => {
        this.platos_listos = data;
        console.log("Cojo los datos del servicio.");
        console.log(data)
        ;});
    this.canal.ayuda_en_mesa().subscribe(data => this.mesas_ayudables = data);
    this.server.getNumeroMesas().subscribe(
        data => { this.nMesas = data;},
        err => { console.log(err);},
        () => {}
        );

    console.log("Se unio");

   }

}
