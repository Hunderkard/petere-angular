import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CamareroService } from 'src/app/service/camarero.service';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QRGeneratorComponent implements OnInit {

  public myAngularxQrCode: string = null;
  mostrarQR = false;
  formulario:FormGroup;
      
  constructor( private server:DatosService) { 
    this.formulario = new FormGroup({
      mesa: new FormControl('',[Validators.required])
      })
    // this.myAngularxQrCode = '¿Qué es esta cosa inútil? Wryyy...';
  }

  ngOnInit(): void {
  }

 generadorCodigosAcme(num){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

onSubmit(){
    let mesa_numero = this.formulario.controls.mesa.value;
    let codigo = this.generadorCodigosAcme(20);
    console.log(codigo);
    this.server.cambiarContra(mesa_numero, codigo).subscribe(
    data => { console.log(data);},
    err => { console.log("Devolvió un error.");},
    () => { console.log("No sé si llegará.");}
    );
    this.myAngularxQrCode =  mesa_numero + "%" + codigo;
        console.log(this.myAngularxQrCode);
    this.mostrarQR = !this.mostrarQR;

}

cambio(){
    this.mostrarQR = !this.mostrarQR;
}

}
