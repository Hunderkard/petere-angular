import { Component, Output, EventEmitter } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { CocinaService } from 'src/app/service/cocina.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.scss']
})
export class ListaMesasComponent {

    mesas = null;
    ocupadas = [];
    mesa=0;
    @Output() mesaElegida = new EventEmitter();

  constructor(private canal:ChatService, private cocina:CocinaService) {
    // pl Saca los datos de la base de datos, pero sólo una vez.
    this.mesas = this.cocina.mesas_total;

// hi Primero lo igualo a la variable que tengo en el servicio, ya que no sé por qué se me 
// hi borran los elementos. Luego, porque no se mantiene el chat, lo igualo con el canal del chat.
    this.ocupadas = this.cocina.mesas_ocupadas;
    this.canal.mesas.subscribe(data => this.ocupadas = data)
  }

  cogerNumero(num){
    this.mesa = num;
  }
  seleccionar(event){
      this.mesaElegida.emit(this.mesa.toString());
  }

}
