import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'cab-admin',
  templateUrl: './cab-admin.component.html',
  styleUrls: ['../cabecera/cabecera.component.scss']
})
export class CabAdminComponent {

  constructor(
    private auth: AuthService,
    private router:Router,
    private token:TokenService,
  ) { }

  logout(e:MouseEvent){
    e.preventDefault();
    this.auth.cambiaStatusAuth(false);
    this.auth.cambiaLevelAuth(1);
    this.router.navigateByUrl('/login');
    this.token.remove();
  }

}
