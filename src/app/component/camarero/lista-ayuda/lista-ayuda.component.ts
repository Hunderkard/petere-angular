import { Component, OnDestroy } from '@angular/core';
import { CamareroService } from 'src/app/service/camarero.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'ayuda',
  templateUrl: './lista-ayuda.component.html',
  styleUrls: ['./lista-ayuda.component.scss']
})
export class ListaAyudaComponent implements OnDestroy{

  mesas_ayudables;
  num = 0;
  miSub;
  
  constructor(private canal:ChatService, private camarero:CamareroService) { 

    this.mesas_ayudables = this.camarero.mesas_ayudables;
    console.log(this.mesas_ayudables);
    // if(!this.camarero.srv_ayuda_en_mesa)
    this.miSub = this.canal.ayuda_en_mesa().subscribe(
        data => { 
          this.mesas_ayudables = data;
        },
        err => { console.log(err);},
    );
    // this.camarero.srv_ayuda_en_mesa = true;
    }


  ayudada(index){
    this.canal.ayudada(index);
  }

  ngOnDestroy(){
      this.miSub.unsubscribe();
  }

}
