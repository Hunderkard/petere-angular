import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-perfil',
  template: '<h1>Cargando</h1>'
})
export class PerfilComponent  {

    level;
  constructor(private auth: AuthService, private router:Router){
    this.auth.authLevel.subscribe(data => {
        console.log(typeof(data));
        this.level = data;

        switch (parseInt(this.level)) {
            case 0:
            this.router.navigateByUrl('admin/home');
                break;
            case 1:
                this.router.navigateByUrl('carta');
                break;
            case 2:
            this.router.navigateByUrl('carta')
                break;
    
            case 3:
            this.router.navigateByUrl('cocina')
                break;
    
            case 4:
            this.router.navigateByUrl('camarero')
                break;
                                
            default:
                break;
        }
    })
    
  }


}
