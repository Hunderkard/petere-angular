import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements OnInit {

    mesa;
    pedido_obj;

  constructor(private canal:ChatService) { }
  ngOnInit(): void {
  }

  capturedQr(result: string) {
    this.pedido_obj = JSON.parse(result);
    this.pedido_obj['mesa'] = this.mesa;

    console.log(this.pedido_obj);
    
    this.canal.mandan_pedido(this.pedido_obj);
  }
}
