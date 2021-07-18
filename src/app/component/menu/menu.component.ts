import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DatosService } from 'src/app/service/datos.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/service/token.service';
import { ChatService } from 'src/app/service/chat.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  // pl Los platos de la BD.
  sub1;
  platos=[];            //ag Desde la base de datos.
  plato_id=[];
  filtros:any[]=[];     //fu Para los pipe.
  serverImg = 'http://localhost:8000/storage/imagenes/plato/';
  // fu Del authService, un BehaviourSubject que monté.
  logueado;             //vo Desde el auth.
  level;                //vo Desde el auth.
  mesado;               //vo Desde el auth.
  mesa_camarero;
  
  pedido = false;       //fu Muestra/Oculta el pedido. Toogle.
  miPedido;             //pl El pedido desde el servidor.
  platosPedidos=[];     //fu Los platos en la cookie.

  bloqueado = false;    //pl Desde el servidor, 
  qr = false;           //fu Muestra/Oculta el QR del pedido de la cookie.
  public myAngularxQrCode: string = 'vacio';

  constructor ( private server:DatosService,private auth:AuthService, private token:TokenService,
    private galletitas:CookieService, private canal:ChatService) {
// vo Me suscribo para comprobar la mesa.
    auth.authMesado.subscribe(
        data =>{ 
// vo Si hay mesa, se comprueba si está bloqueada.
            if(data){
                this.mesado = data;
                if(data[this.mesado]) this.bloqueado = true;
                else { this.bloqueado = false}}
            });

    this.sub1 = this.canal.bloqueado().subscribe(
// vo Datos es un array booleano de las que están bloqueadas.
        datos => { 
        this.server.getMesaUsuario(this.token.getUsuario()).subscribe(
// vo Data es el número de la mesa que tiene el actual usuario en la BD.
            data => { 
// vo Le ponemos el valor al Subject Behaviour, por si las moscas.
                this.auth.cambiaMesaAuth(data[0]);
            },
            err => { console.log(err);},
            () => {
// vo Hago lo mismo que fuera. No recuerdo cual de los dos es el que funciona, o si los dos son necesarios.
                this.auth.authMesado.subscribe(data => { this.mesado = data});
            console.count('dandole');
                if(datos[this.mesado]) this.bloqueado = true;
                else { this.bloqueado = false}
                }
        );
        },
        err => { console.log(err);},
    );
    
    this.canal.anotando_pedidos().subscribe(
// vo Data es un array con el objeto del pedido que tengo en el servidor del chat.
        (data:any[]) => {     
            let miPedidoObj = data.find(element => element['mesa'] == this.mesado);

            this.miPedido = this.obj2arr(miPedidoObj);
            
    },
        err => { console.log(err)}
    );

    
    this.cargarPedido();
  }

  ngOnInit(): void {
// pl DESCARGAR LOS PLATOS.
    if(this.server.platos_cliente){    // el Si están en el servicio, de allí los cojo.
      for (const plato in this.server.platos_cliente) { 
          const element = this.server.platos_cliente[plato];
          if(typeof(element) == 'object'){
            this.platos.push(element);
            this.plato_id.push([element[0][2], element[0][4]]);
          }
      }
      console.log(this.platos);
    } else {                          // el Si no, los descargo del servidor. Pero sólo la primera vez.
      this.server.getRecetas().subscribe(
        data => {
            for (const plato in data) {
                const element = data[plato];
                if(typeof(element) == 'object'){
                    this.platos.push(element);
                    this.plato_id.push([element[0][2], element[0][4]]);
                }
                console.log(this.platos);
            }
        },
        err => { console.log(err);}
      );
    }
    // fu ORDENO ALFABÉTICAMENTE LOS PLATOS.
    this.platos.sort( (a,b)=> { 
      if (a.tipo > b.tipo) return 1;  
      else if (a.tipo < b.tipo) return -1;
      else return 0;
    });

    console.log(this.platos);

    // pl COMPROBAR SI ESTÁ LOGUEADO.
    this.auth.authStatus.subscribe(
      data => {this.logueado = data;},
      err => { console.log(err);}
    );

    this.auth.authLevel.subscribe(
    data => { this.level = data;console.log(data); },
    err => { console.log(err);},
    () => { }
    );
 
  }

  ngOnDestroy(){
      this.sub1.unsubscribe();
  }
// bi Muestra/Oculta el pedido.
  mostrarPedido(){
    this.pedido = !this.pedido;
    this.canal.comprobarPedido();
  }

  mandarPedido(){
    this.guardarPedido();  
    let ped = JSON.parse(this.galletitas.get('pedido'));
    
    if(this.level == 4) {
     ped['mesa'] = this.mesa_camarero;
    console.log(ped);
    this.canal.mandan_pedido(ped);
    }else{
        this.canal.mandan_pedido(JSON.parse(this.galletitas.get('pedido')));
    }
  }

  pedirAyuda(){
    this.canal.pedir_ayuda(this.mesado);
  }

//bi Agrega un plato más al pedido.
  pedir(plato){
    this.platosPedidos.push( {
      "id":plato[0][4],
      "nombre": plato[0][2],
      "precio": plato[0][0]
    });
  }

// bi Guarda el pedido en forma de cookie.
  guardarPedido(){
    let counts={};
    let i = 0;
    this.platosPedidos.forEach((x) => {
        counts[i++] = [x.id, false, x.nombre, x.precio];
    });
        
    counts['mesa'] = this.mesado;
    this.galletitas.set('pedido', JSON.stringify(counts));
  }
// bi Convierte la cookie en objeto y lo carga en pedido.
  cargarPedido(){
    if(this.galletitas.check('pedido')){
      let laGalleta = JSON.parse(this.galletitas.get('pedido'));
      console.log(laGalleta);
      for (const plato in laGalleta) {
        if(plato != 'mesa'){
            console.log(laGalleta[plato][0]);
            this.platosPedidos.push( {
                "id":laGalleta[plato][0],
                "nombre": laGalleta[plato][2],
                "precio": laGalleta[plato][3]
            });
        } 
      }
    }
  }
// bi Borra el plato seleccionado del pedido.
  borrar(index){
    this.platosPedidos.splice(index, 1);
  }

  bloq(bool){
      if(bool) return "disabled";
  }

  tachado(string){
    return string.slice(0, 1) == "T";
  }

  limado(string){
    return string.slice(1);
  }

  generarQR(){
    this.guardarPedido();
    this.myAngularxQrCode = this.galletitas.get('pedido')
    this.qr = !this.qr;
  }

  textoBoton(){
      return this.qr ? "Mostrar pedido" : "Generar QR";
  }

  obj2arr(obj){
    let arr = [];
    let i = 0;
    for (const pedido in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, pedido)) {
            arr[i++] = obj[pedido];
        }
    }
    return arr;
  }

  expandido(orden){
    if(typeof(orden) == "object"){
       return [(this.plato_id.find( (a) =>  a[1] == orden[0]))[0], orden[1]];
    }
    else{
        return ['Mesa', orden];
    }
  }
  
}
