import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
// ps Aquí realizo los POST para retornar observables.
// ps Los otros componentes sólo harán el .subscribe.

  BackUrl = 'http://localhost:8000';
  header = new HttpHeaders({
      // 'Accept' : 'application/json',
      // 'content-type' : 'x-www-form-urlencoded',
      'Authorization' : `bearer ${this.token.get()}`,
  });

  platos_cliente;

  constructor(private http:HttpClient, private token:TokenService) {
    this.http.get(`${this.BackUrl}/recetas`, {headers: this.header}).subscribe(
      data => { this.platos_cliente = data;},
      err => { console.log(err);},
      () => {}
    );
  }
  
  login(formulario){
    return this.http.post(`${this.BackUrl}/login`, {
      "email" : formulario.controls.email.value, 
      "password" : formulario.controls.password.value
    });
  }

  register(formulario){
    return this.http.post(`${this.BackUrl}/register`, {
      "name" : formulario.controls.nombre.value,
      "email" : formulario.controls.email.value,
      "password" : formulario.controls.password.value,
    });
  }

  sendEmailPassReset(formulario){
    return this.http.post(`${this.BackUrl}/sendPasswordReset`, {
      "email": formulario.controls.email.value
    });
  }

  sendEmailReserva(formulario){
    let reserva ={
      "nombre": formulario.controls.nombre.value,
      "telefono": formulario.controls.telefono.value,
      "fecha": formulario.controls.fecha.value,
      "personas": formulario.controls.personas.value,
      "hora": formulario.controls.hora.value,
      "email": formulario.controls.email.value,
      "ruedas": formulario.controls.ruedas.value,
      "carrito": formulario.controls.carrito.value,
      "alergias": formulario.controls.alergias.value,
      "alergia": formulario.controls.alergia.value,
    }
    return this.http.post(
      `${this.BackUrl}/sendReserva`,
      reserva
    )

  }

  changePass(formulario){
    return this.http.post(`${this.BackUrl}/changePasswordReset`, {
      "email": formulario.controls.email.value,
      "password": formulario.controls.password.value,
      "token": formulario.controls.resetToken.value,
    });
  }

/*
 
   /$$$$$$  /$$$$$$$  /$$$$$$$$  /$$$$$$  /$$$$$$$$ /$$$$$$$$
  /$$__  $$| $$__  $$| $$_____/ /$$__  $$|__  $$__/| $$_____/
 | $$  \__/| $$  \ $$| $$      | $$  \ $$   | $$   | $$      
 | $$      | $$$$$$$/| $$$$$   | $$$$$$$$   | $$   | $$$$$   
 | $$      | $$__  $$| $$__/   | $$__  $$   | $$   | $$__/   
 | $$    $$| $$  \ $$| $$      | $$  | $$   | $$   | $$      
 |  $$$$$$/| $$  | $$| $$$$$$$$| $$  | $$   | $$   | $$$$$$$$
  \______/ |__/  |__/|________/|__/  |__/   |__/   |________/
                                                             
                                                             
                                                             
 
*/

  createIngrediente(formulario, foto: File, img){

    const formData: FormData = new FormData();
    if(!img) formData.append('imagen', foto, foto.name);
    formData.append('nombre', formulario.value.nombre);
    formData.append('precio', formulario.value.precio);
    formData.append('proveedor', formulario.value.proveedor);
    // formData.append('fecha_compra', formulario.value.fecha_compra);
    // formData.append('fecha_caducidad', formulario.value.fecha_caducidad);
    formData.append('cantidad', formulario.value.cantidad);
    formData.append('unidad', formulario.value.unidad);
    formData.append('observaciones', formulario.value.observaciones,);

    console.log(formData);

    return this.http.post(
      `${this.BackUrl}/ingredientes`, 
      formData, 
      { headers: this.header});
  }
  // fu Al proveedor, ¿y si no tiene img?
  createProveedor(formulario, foto:File){
    
    const formData: FormData = new FormData();
    formData.append('imagen', foto, foto.name);
    formData.append('nombre', formulario.value.nombre);

    return this.http.post(
      `${this.BackUrl}/proveedores`, 
      formData, 
      { headers: this.header});
  }
  createUser(formulario){
    const formData: FormData = new FormData();
    formData.append('name', formulario.value.nombre);
    formData.append('email', formulario.value.email);
    formData.append('password', formulario.value.password);
    formData.append('level', formulario.value.level);
    
    return this.http.post(
      `${this.BackUrl}/usuarios`,
      formData, 
      {headers: this.header}
    )
  }
  createPlato(formulario, foto:File, img){
    const formData: FormData = new FormData();
    if(!img)formData.append('imagen', foto, foto.name);
    formData.append('nombre', formulario.value.nombre);
    formData.append('observaciones', formulario.value.descripcion);
    formData.append('precio', formulario.value.precio);

    for (let i = 0; i < formulario.controls.ingredientes.value.length; i++) {
      let ing = formulario.controls.ingredientes.value[i];
      console.log(ing);
      let ing_id = ing.nombre.split("|")[0]
      
      formData.append(`${i}id`, ing_id);
      formData.append(`${i}cant`, ing.cantidad);
    }
    return this.http.post(
      `${this.BackUrl}/platos`,
      formData,
      {headers: this.header});
  }
/*
 
   /$$$$$$  /$$$$$$$$ /$$$$$$$$
  /$$__  $$| $$_____/|__  $$__/
 | $$  \__/| $$         | $$   
 | $$ /$$$$| $$$$$      | $$   
 | $$|_  $$| $$__/      | $$   
 | $$  \ $$| $$         | $$   
 |  $$$$$$/| $$$$$$$$   | $$   
  \______/ |________/   |__/   
                               
                               
                               
 
*/

  getIngredientes(){
    return this.http.get(`${this.BackUrl}/ingredientes`, {headers: this.header});
  }
  getIngrediente(id: number){
    return this.http.get(`${this.BackUrl}/ingredientes/${id}`, { headers: this.header});
  }

  getProveedores(){
    return this.http.get(
      `${this.BackUrl}/proveedores`,
      {headers: this.header})
  }
  getProveedor(id: number){
    return this.http.get(
      `${this.BackUrl}/proveedores/${id}`,
      {headers: this.header})
  }

  getUsuarios(){
    return this.http.get(
      `${this.BackUrl}/usuarios`,
      {headers: this.header}
    )
  }
  getUsuario(id:number){
    return this.http.get(
      `${this.BackUrl}/usuarios/${id}`,
      {headers:this.header}
    )
  }

  getPlatos(){
    return this.http.get(
      `${this.BackUrl}/platos`,
      {headers: this.header}
    )
  }
  getPlato(id:number){
    return this.http.get(
      `${this.BackUrl}/platos/${id}`,
      {headers: this.header}
    )
  }

  getReceta(id:number){
    return this.http.get(
      `${this.BackUrl}/receta/${id}`,
      {headers: this.header}
    )
  }

  getRecetas(){
    return this.http.get(
      `${this.BackUrl}/recetas`,
      {headers: this.header}
    )
  }

/*
 
  /$$$$$$$  /$$   /$$ /$$$$$$$$
 | $$__  $$| $$  | $$|__  $$__/
 | $$  \ $$| $$  | $$   | $$   
 | $$$$$$$/| $$  | $$   | $$   
 | $$____/ | $$  | $$   | $$   
 | $$      | $$  | $$   | $$   
 | $$      |  $$$$$$/   | $$   
 |__/       \______/    |__/   
                               
                               
                               
 
*/

  updateIngrediente(formulario, foto:File, id, img){

    let ingrediente:any = {
      "nombre": formulario.value.nombre,
      "precio": formulario.value.precio,
      "observaciones": formulario.value.observaciones,
      "stock": formulario.value.stock,
      "unidad": formulario.value.unidad
    };

    if(!img) {
      ingrediente.fotoName = foto.name;
      const formData: FormData = new FormData();
      formData.append('imagen', foto, foto.name);
      formData.append('id', id); //Para sacar antiguo nombre
      formData.append('nombre', formulario.value.nombre); //Nuevo nombre.
      this.http.post(`${this.BackUrl}/imagen/ingrediente`, formData, {headers: this.header})
      .subscribe(
        data => console.log(data),
        err => console.log(err),
      );
    }

    return this.http.put(
      `${this.BackUrl}/ingredientes/${id}`,
      ingrediente,
      {headers: this.header}
    )
  }
  updateProveedor(formulario, foto:File, id, img){
    let proveedor:any = {
      "nombre": formulario.value.nombre
    }

    if(!img){
      proveedor.fotoName = foto.name;
      const formData: FormData = new FormData();
      formData.append('imagen', foto, foto.name);
      formData.append('id', id); //Para sacar antiguo nombre
      formData.append('nombre', formulario.value.nombre); //Nuevo nombre.
      this.http.post(`${this.BackUrl}/imagen/proveedor`, formData, {headers: this.header})
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      )
    }

    return this.http.put(
      `${this.BackUrl}/proveedores/${id}`, 
      proveedor, 
      {headers: this.header}
    )
  }
  updateUsuario(formulario, id){
    let usuario = {
      "name": formulario.value.nombre,
      "email": formulario.value.email,
      "mesa": formulario.value.mesa,  
      "level": formulario.value.level,
    }
    return this.http.put(
      `${this.BackUrl}/usuarios/${id}`,
      usuario,
      {headers:this.header}
    )
  }
  updateMesaUsuario(nombre_usuario, mesa = null){
    let usuario = {
      "name": nombre_usuario,
      "mesa": mesa
    }

    return this.http.put(
      `${this.BackUrl}/sentar`,
      usuario,
      {headers: this.header}
    )
  }
  updatePlato(formulario, foto:File, id, img){
    let plato:any = {
      "nombre": formulario.value.nombre,
      "precio": formulario.value.precio,
      "observaciones": formulario.value.observaciones,
      "ingredientes": formulario.value.ingredientes
    }

    if(!img){
      plato.fotoName = foto.name;
      const formData: FormData = new FormData();
      formData.append('imagen', foto, foto.name);
      formData.append('id', id); //Para sacar antiguo nombre
      formData.append('nombre', formulario.value.nombre); //Nuevo nombre.
      this.http.post(`${this.BackUrl}/imagen/plato`, formData, {headers: this.header})
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      )
    }

    return this.http.put(
      `${this.BackUrl}/platos/${id}`,
      plato,
      {headers: this.header}
    )
  }


/*
 
  /$$$$$$$  /$$$$$$$$ /$$       /$$$$$$$$ /$$$$$$$$ /$$$$$$$$
 | $$__  $$| $$_____/| $$      | $$_____/|__  $$__/| $$_____/
 | $$  \ $$| $$      | $$      | $$         | $$   | $$      
 | $$  | $$| $$$$$   | $$      | $$$$$      | $$   | $$$$$   
 | $$  | $$| $$__/   | $$      | $$__/      | $$   | $$__/   
 | $$  | $$| $$      | $$      | $$         | $$   | $$      
 | $$$$$$$/| $$$$$$$$| $$$$$$$$| $$$$$$$$   | $$   | $$$$$$$$
 |_______/ |________/|________/|________/   |__/   |________/
                                                             
                                                             
                                                             
 
*/

  deleteIngrediente(id){
    return this.http.delete(`${this.BackUrl}/ingredientes/${id}`, {headers:this.header})
  }
  deleteProveedor(id){
    return this.http.delete(`${this.BackUrl}/proveedores/${id}`, {headers: this.header});
  }
  deleteUser(id){
    return this.http.delete(`${this.BackUrl}/usuarios/${id}`, {headers: this.header})
  }
  deletePlato(id){
    return this.http.delete(`${this.BackUrl}/platos/${id}`, {headers: this.header})

  }

/*
 
   /$$$$$$  /$$$$$$$$ /$$$$$$   /$$$$$$  /$$   /$$
  /$$__  $$|__  $$__//$$__  $$ /$$__  $$| $$  /$$/
  | $$  \__/   | $$  | $$  \ $$| $$  \__/| $$ /$$/ 
  |  $$$$$$    | $$  | $$  | $$| $$      | $$$$$/  
   \____  $$   | $$  | $$  | $$| $$      | $$  $$  
   /$$  \ $$   | $$  | $$  | $$| $$    $$| $$\  $$ 
  |  $$$$$$/   | $$  |  $$$$$$/|  $$$$$$/| $$ \  $$
  \______/    |__/   \______/  \______/ |__/  \__/
                                                
                                                              
                                                              
 
*/

updateStock(formulario){
  let stock:any = {
    "compras": formulario.value.compras
  }
  return this.http.put(
    `${this.BackUrl}/compra`,
    stock,
    {headers: this.header}
  );
}  
dropStock(formulario){
  let stock:any = {
    "perdidas": formulario.value.perdidas
  }
  return this.http.put(
    `${this.BackUrl}/perdida`,
    stock,
    {headers: this.header}
  );
}

/*
 
  /$$      /$$ /$$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$ 
 | $$$    /$$$| $$_____/ /$$__  $$ /$$__  $$ /$$__  $$
 | $$$$  /$$$$| $$      | $$  \__/| $$  \ $$| $$  \__/
 | $$ $$/$$ $$| $$$$$   |  $$$$$$ | $$$$$$$$|  $$$$$$ 
 | $$  $$$| $$| $$__/    \____  $$| $$__  $$ \____  $$
 | $$\  $ | $$| $$       /$$  \ $$| $$  | $$ /$$  \ $$
 | $$ \/  | $$| $$$$$$$$|  $$$$$$/| $$  | $$|  $$$$$$/
 |__/     |__/|________/ \______/ |__/  |__/ \______/ 
                                                      
                                                      
                                                      
 
*/
getNumeroMesas(){
  return this.http.get(
    `${this.BackUrl}/numero_mesas`,
    {headers: this.header}
  )
}

getMesaUsuario(nombre){
  return this.http.get(
    `${this.BackUrl}/mesa_de/${nombre}`,
    {headers: this.header}
  )
}

checkMesa(formulario){
  const formData: FormData = new FormData();
  formData.append('numero', formulario.value.numero);
  formData.append('codigo', formulario.value.codigo);

  return this.http.post(
    `${this.BackUrl}/mesa`,
    formData,
    {headers: this.header}
  )
}

anotar(mesa_id, plato_id){
    return this.http.get(
        `${this.BackUrl}/anotar/${mesa_id}/${plato_id}`,
        {headers: this.header}
    )
}

cobrar(mesa_id){
    
    return this.http.get(
        `${this.BackUrl}/cobrar/${mesa_id}`,
        {headers: this.header}
    )
}

limpiar(mesa_id){
    return this.http.get(
        `${this.BackUrl}/limpiar/${mesa_id}`,
        {headers: this.header}
    )
}

caja(){
    return this.http.get(
        `${this.BackUrl}/caja`,
        {headers:this.header}
    )
}

cambiarContra(mesa_num, codigo){
    const formData: FormData = new FormData();
    formData.append('mesa_num', mesa_num);
    formData.append('codigo', codigo);

  console.log("Paso 2: Desde el servicio.");
  console.log(formData);

    return this.http.post(
        `${this.BackUrl}/fijar`,
        formData,
        {headers: this.header}
      )
}

restarPlato(plato_id){
    return this.http.get(
        `${this.BackUrl}/restar_plato/${plato_id}`,
        {headers: this.header}
    )
}
}