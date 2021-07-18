import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private Token: TokenService) { 
    this.authMesado.subscribe(
    data => { },
    err => { console.log(err);},
    () => { }
    );
  }


/*
 
 88      dP"Yb   dP""b8 88   88 888888    db    8888b.   dP"Yb  
 88     dP   Yb dP   `" 88   88 88__     dPYb    8I  Yb dP   Yb 
 88  .o Yb   dP Yb  "88 Y8   8P 88""    dP__Yb   8I  dY Yb   dP 
 88ood8  YbodP   YboodP `YbodP' 888888 dP""""Yb 8888Y"   YbodP  
 
*/
  private logueado = new BehaviorSubject <boolean> (this.Token.getLogueado());
  authStatus = this.logueado.asObservable();

  cambiaStatusAuth(value: boolean){
    this.logueado.next(value);
  }

/*
 
 88     888888 Yb    dP 888888 88     
 88     88__    Yb  dP  88__   88     
 88  .o 88""     YbdP   88""   88  .o 
 88ood8 888888    YP    888888 88ood8 
 
*/

  private level = new BehaviorSubject <number> (this.Token.getLevel());
  authLevel = this.level.asObservable();

  cambiaLevelAuth(value = null){
    
    this.level.next(value ?? this.Token.getLevel());
    // ps Si se usara el operador || en lugar de ??, los valores 0, "", y false no 
    // ps se considerarían valores, y devolverían el de la derecha. Ahora sólo los 
    // ps valores null y undefined harán que se devuelva el valor de la derecha.
 
}

/*
 
 8b    d8 888888 .dP"Y8    db    
 88b  d88 88__   `Ybo."   dPYb   
 88YbdP88 88""   o.`Y8b  dP__Yb  
 88 YY 88 888888 8bodP' dP""""Yb 
 
*/

  private mesado = new BehaviorSubject <number> (null);
  authMesado = this.mesado.asObservable();

  cambiaMesaAuth(value = null){
    this.mesado.next(value);
  }
}