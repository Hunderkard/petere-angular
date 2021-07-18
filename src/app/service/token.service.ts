import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login:'http://localhost:8000/login',
    register: 'http://localhost:8000/resgister'
  };

  set(token){
    localStorage.setItem('token', token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
  }

  // ps Devuelve el nivel guardado en el payload.
  getLevel(){
    const token = this.get();
    // console.log("Accediendo al nivel");
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if(payload){ 
        // console.log("Sí, tiene algún nivel.")
        // console.log(payload.level);
        // console.log("El nivel es " + payload.level);
        return (payload.level);
      }
    }
    // console.log("No, no tiene el token.");
    return 1;
  }

   // ps Devuelve el usuario guardado en el payload.
  getUsuario(){
    const token = this.get();
    // console.log("Accediendo al nivel");
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if(payload){ 
        // console.log("Sí, tiene algún nivel.")
        // console.log(payload.nombre);
        // console.log("El nombre es " + payload.nombre);
        return (payload.nombre);
      }
    }
    // console.log("No, no tiene el token.");
    return 0;
  }

  //ps Comprueba si el iss del payload proviene del login o del register.
  getLogueado(){
    const token = this.get();
    // console.log("Comprobando si está tiene el token.");
    if(token) {
      const payload = JSON.parse(   // ps Codificar a JSON.
                                  atob( // ps Desencriptar.
                                  token.split('.')[1] // ps Partir.
                                  )
                                ); 

      if(payload){ 
        // console.log("Sí, tiene el token.")
        return  Object.values(this.iss)     // ps Array de los valores del objeto.
                .indexOf(payload.iss)       // ps Busca el que tienes. 0 ó 1 en este caso.
                > -1 ?  // el La posición es 0 o superior.
                true :  // pl Sí, así que estás bien logueado.
                false;  // fu No, no estás bien logueado.
      }
    }
    // console.log("No, no tiene el token.");
    return false;
  }
}
