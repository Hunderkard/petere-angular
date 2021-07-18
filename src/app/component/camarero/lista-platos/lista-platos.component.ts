import { Component, OnDestroy, OnInit} from '@angular/core';
import { CamareroService } from 'src/app/service/camarero.service';
import { ChatService } from 'src/app/service/chat.service';
import { DatosService } from 'src/app/service/datos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'platos-listos',
  templateUrl: './lista-platos.component.html',
  styleUrls: ['./lista-platos.component.scss']
})
export class ListaPlatosComponent implements OnInit, OnDestroy {

  nombre;
  constructor(private token:TokenService, private canal:ChatService, 
    private camarero:CamareroService, private server:DatosService) {
    this.nombre = this.token.getUsuario();
  }
  platos;
  mostrar_platos = false;
  camareros_yendo;
  miSub1;
  miSub2;
  tokenErr = false;

  ngOnInit(): void {
    this.server.cobrar(1).subscribe(
        data => {if(data['Ojito']) this.tokenErr=true},
        err => console.log(err)
    )

    this.platos = this.camarero.platos_listos;
    
    this.miSub1 = this.canal.plato_para_mesa().subscribe(
    data => {
        console.log("Cuando cojo los de la subscripción.");
      this.platos = data;
    });
    
    this.miSub2 = this.canal.llevando_plato().subscribe(
        data => {
      this.platos = data;
    });

  }

  voy(i){
    this.canal.voy(i, this.nombre);
  }

  no_voy(i){
    this.canal.no_voy(i);
  }

  borrar(num){
    let plato = this.platos.splice(num, 1)[0];
    console.log(plato);
    this.server.anotar(plato[0], plato[1]).subscribe(
    data => { console.log(data);},
    err => { console.log(err);},
    );
    this.canal.ya_fui(num);
    this.server.restarPlato(plato[1]);
  }

  mostrar(){
    this.mostrar_platos = true;
    this.no_voy(null);
  }

  ngOnDestroy(){
      this.miSub1.unsubscribe();
      this.miSub2.unsubscribe();
  }
}
