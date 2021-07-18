import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ti SERVICIOS
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public logueado : boolean;
  public level: number;
  public nombre: string;

  constructor(
    private auth: AuthService,
    private router:Router,
    private token:TokenService,
  ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(data => {
      this.logueado = data;
      // console.log("Desde la cabecera creo que el usuario está " + data);
    })
    this.auth.authLevel.subscribe(data => {
      this.level = data;
      // console.log("Desde la cabecera le veo un nivel " + data);
    })
    this.nombre = this.token.getUsuario();
  }

  logout(e:MouseEvent){
    e.preventDefault();
    this.auth.cambiaStatusAuth(false);
    this.auth.cambiaLevelAuth(1);
    this.router.navigateByUrl('/login');
    this.token.remove();
  }

}
