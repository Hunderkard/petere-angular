import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
/* extends Socket */
export class ChatService {

  mesas = this.socket.fromEvent<boolean[]>('mesas');

  constructor(private socket: Socket) { 
      console.log("A VER SI CON " + this.mesas);
 
  }

 

    unirse(canal = 'Mesas_Cocina'){
        console.log("Me uno al canal " + canal);
      this.socket.emit('unirse', canal);
    }

/*
 
   /$$$$$$  /$$       /$$$$$$ /$$$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$$$
  /$$__  $$| $$      |_  $$_/| $$_____/| $$$ | $$|__  $$__/| $$_____/
 | $$  \__/| $$        | $$  | $$      | $$$$| $$   | $$   | $$      
 | $$      | $$        | $$  | $$$$$   | $$ $$ $$   | $$   | $$$$$   
 | $$      | $$        | $$  | $$__/   | $$  $$$$   | $$   | $$__/   
 | $$    $$| $$        | $$  | $$      | $$\  $$$   | $$   | $$      
 |  $$$$$$/| $$$$$$$$ /$$$$$$| $$$$$$$$| $$ \  $$   | $$   | $$$$$$$$
  \______/ |________/|______/|________/|__/  \__/   |__/   |________/
                                                                    
*/

/*
 
 oooooooooooo ooo        ooooo ooooo ooooooooooooo oooooooooooo ooooo      ooo 
 `888'     `8 `88.       .888' `888' 8'   888   `8 `888'     `8 `888b.     `8' 
  888          888b     d'888   888       888       888          8 `88b.    8  
  888oooo8     8 Y88. .P  888   888       888       888oooo8     8   `88b.  8  
  888    "     8  `888'   888   888       888       888    "     8     `88b.8  
  888       o  8    Y     888   888       888       888       o  8       `888  
 o888ooooood8 o8o        o888o o888o     o888o     o888ooooood8 o8o        `8  
                                                                           
 
*/
// pl Pasan el número de la mesa cuando la ocupan.
// dr Cocina.
  ocupan_mesa(mesa){
      console.log("OCUPO LA MESA " + mesa);
    this.socket.emit('ocupan_mesa', mesa);
  }
// pl Pasan el número de la mesa cuando la abandonan.
// dr Cocina.
  abandonan_mesa(mesa){
      console.log("ABANDODNO LA MESA " + mesa);
    this.socket.emit('abandonan_mesa', mesa);
  }
// pl Pasan un objeto con el pedido.{id_plato:cantidad}
// dr Cocina.
  mandan_pedido(pedido){
      console.log("MANDO EL PEDIDO " + pedido);
    this.socket.emit('mandan_pedido', pedido); 
  }
// pl Pasa el número de la mesa cuando pide ayuda.
// dr Camarero
  pedir_ayuda(mesa){
      console.log("PIDO AYUDA AL CAMARERO " + mesa);
    this.socket.emit('ayuda_para', mesa);
  }

  comprobarPedido(){
      console.log("El cliente emitiendo para escuchar");
    this.socket.emit('listo_pedido', null);
  }

/*
 
   .oooooo.   oooooo   oooo oooooooooooo ooooo      ooo 
  d8P'  `Y8b   `888.   .8'  `888'     `8 `888b.     `8' 
 888      888   `888. .8'    888          8 `88b.    8  
 888      888    `888.8'     888oooo8     8   `88b.  8  
 888      888     `888'      888    "     8     `88b.8  
 `88b    d88'      888       888       o  8       `888  
  `Y8bood8P'      o888o     o888ooooood8 o8o        `8  
                                                        

*/
 // pl Recibe booleano para dejar de modificar el pedido.
 // dr Cocina
 bloqueado(){
    console.log("Han bloqueado a una mesa");
    return this.socket.fromEvent('bloqueando');
}

/*
 
   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$ 
  /$$__  $$ /$$__  $$ /$$__  $$|_  $$_/| $$$ | $$ /$$__  $$
 | $$  \__/| $$  \ $$| $$  \__/  | $$  | $$$$| $$| $$  \ $$
 | $$      | $$  | $$| $$        | $$  | $$ $$ $$| $$$$$$$$
 | $$      | $$  | $$| $$        | $$  | $$  $$$$| $$__  $$
 | $$    $$| $$  | $$| $$    $$  | $$  | $$\  $$$| $$  | $$
 |  $$$$$$/|  $$$$$$/|  $$$$$$/ /$$$$$$| $$ \  $$| $$  | $$
  \______/  \______/  \______/ |______/|__/  \__/|__/  |__/
                                                           

*/
/*
 
 oooooooooooo ooo        ooooo ooooo ooooooooooooo oooooooooooo ooooo      ooo 
 `888'     `8 `88.       .888' `888' 8'   888   `8 `888'     `8 `888b.     `8' 
  888          888b     d'888   888       888       888          8 `88b.    8  
  888oooo8     8 Y88. .P  888   888       888       888oooo8     8   `88b.  8  
  888    "     8  `888'   888   888       888       888    "     8     `88b.8  
  888       o  8    Y     888   888       888       888       o  8       `888  
 o888ooooood8 o8o        o888o o888o     o888o     o888ooooood8 o8o        `8  
                                                                               

*/

// pl Pasa el objeto con el plato listo para llevar a mesa. {nombre_plato:mesa}
  listo_pedido(pedido){
      console.log("PLATO LISTO " + pedido);
    this.socket.emit('listo_pedido', pedido);
  }

  bloquear_mesa(mesa){
      this.socket.emit('bloquear_mesa', mesa);
  }
  desbloquear_mesa(mesa){
    this.socket.emit('desbloquear_mesa', mesa);
}

/*
 
   .oooooo.   oooooo   oooo oooooooooooo ooooo      ooo 
  d8P'  `Y8b   `888.   .8'  `888'     `8 `888b.     `8' 
 888      888   `888. .8'    888          8 `88b.    8  
 888      888    `888.8'     888oooo8     8   `88b.  8  
 888      888     `888'      888    "     8     `88b.8  
 `88b    d88'      888       888       o  8       `888  
  `Y8bood8P'      o888o     o888ooooood8 o8o        `8  
                                                        

*/
// pl Baja la lista de mesas que estan ocupadas.
// dr SERVER
    lista_mesas_ocupadas(){
        console.log("BAJANDO LAS MESAS");
      return this.socket.fromEvent('mesas');
    }
// pl Baja la lista de los pedidos hechos.
// dr SERVER
    anotando_pedidos(){
        console.log("BAJANDO LOS PEDIDOS");
      return this.socket.fromEvent('anotamos_pedido');
    }


/*
 
   /$$$$$$   /$$$$$$  /$$      /$$  /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$$$$$$   /$$$$$$ 
  /$$__  $$ /$$__  $$| $$$    /$$$ /$$__  $$| $$__  $$| $$_____/| $$__  $$ /$$__  $$
 | $$  \__/| $$  \ $$| $$$$  /$$$$| $$  \ $$| $$  \ $$| $$      | $$  \ $$| $$  \ $$
 | $$      | $$$$$$$$| $$ $$/$$ $$| $$$$$$$$| $$$$$$$/| $$$$$   | $$$$$$$/| $$  | $$
 | $$      | $$__  $$| $$  $$$| $$| $$__  $$| $$__  $$| $$__/   | $$__  $$| $$  | $$
 | $$    $$| $$  | $$| $$\  $ | $$| $$  | $$| $$  \ $$| $$      | $$  \ $$| $$  | $$
 |  $$$$$$/| $$  | $$| $$ \/  | $$| $$  | $$| $$  | $$| $$$$$$$$| $$  | $$|  $$$$$$/
  \______/ |__/  |__/|__/     |__/|__/  |__/|__/  |__/|________/|__/  |__/ \______/ 
                                                                                    

*/
/*
 
 oooooooooooo ooo        ooooo ooooo ooooooooooooo oooooooooooo ooooo      ooo 
 `888'     `8 `88.       .888' `888' 8'   888   `8 `888'     `8 `888b.     `8' 
  888          888b     d'888   888       888       888          8 `88b.    8  
  888oooo8     8 Y88. .P  888   888       888       888oooo8     8   `88b.  8  
  888    "     8  `888'   888   888       888       888    "     8     `88b.8  
  888       o  8    Y     888   888       888       888       o  8       `888  
 o888ooooood8 o8o        o888o o888o     o888o     o888ooooood8 o8o        `8  
                                                                               

*/
// pl Pasa el nombre y la posición en lista de platos listos.
// dr Camareros
  voy(index, nombre){
      console.log("YO, " + nombre + " VOY A " + index);
    this.socket.emit('voy_a', index, nombre)
  }
// pl Pasa la posición en la lista para liberarlo.
// dr Camareros
  no_voy(index){
      console.log("DEJO DE IR A " + index);
    this.socket.emit('no_voy_a', index)
  }
// pl Pasa la posición en la lista para borrarlo.
// dr Camareros
  ya_fui(i){
      console.log("YA FUI A LA MESA " + i);
    this.socket.emit('ya_fui', i);
  }
// pl Pasa la posición en la lista para borrarlo.
// dr Camareros
  ayudada(i){
      console.log("YA AYUDÉ A LA MESA " + i);
    this.socket.emit('ayudada', i);
  }

/*
 
   .oooooo.   oooooo   oooo oooooooooooo ooooo      ooo 
  d8P'  `Y8b   `888.   .8'  `888'     `8 `888b.     `8' 
 888      888   `888. .8'    888          8 `88b.    8  
 888      888    `888.8'     888oooo8     8   `88b.  8  
 888      888     `888'      888    "     8     `88b.8  
 `88b    d88'      888       888       o  8       `888  
  `Y8bood8P'      o888o     o888ooooood8 o8o        `8  
                                                                                                           
 
*/
// pl Agrega un plato a la lista de platos para llevar.
// dr Cocina
  plato_para_mesa(){
      console.log("Atento a los platos.");
    return this.socket.fromEvent('plato!');
  }
// pl Agrega una mesa a la lista de mesas para ayudar.
// dr Cliente
  ayuda_en_mesa(){
      console.log("Atento a las mesas.");
    return this.socket.fromEvent('ayuda!');
  }
// pl Baja la lista de platos para ser llevados.
// dr Camareros
  llevando_plato(){
      console.log("Atento a los camareros.");
    return this.socket.fromEvent('yendo');
  }

}



  // currentDocument = this.socket.fromEvent<Document>('document');
  // documents = this.socket.fromEvent<string[]>('documents');
  // /* CREA UN OBSERVABLE PASANDOLE EL VALOR DE UN EVENTO. */
  // getDocument(id: string) {
  //   this.socket.emit('getDoc', id);
  // }

  // newDocument() {
  //   this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  // }

  // editDocument(document: Document) {
  //   this.socket.emit('editDoc', document);
  // }

  // private docId() {
  //   let text = '';
  //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  //   for (let i = 0; i < 5; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }

  //   return text;
  // }
