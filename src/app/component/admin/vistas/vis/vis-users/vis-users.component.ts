import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-vis-users',
  templateUrl: './vis-users.component.html',
  styleUrls: ['../vis-ingredientes/vis-ingredientes.component.scss']
})
export class VisUsersComponent implements OnInit {

  usuarios=[];
  filtroNombre = '';

  constructor(private server:DatosService) { }

  ngOnInit(): void {
    this.server.getUsuarios().subscribe(
      data => { // ps No voy a cambiar la propiedad .name en toda la aplicación en este momento.
        for (const usu in data) {
          if (Object.prototype.hasOwnProperty.call(data, usu)) {
            const element = data[usu];
            let usuario = {
                  id:element.id,
                  nombre:element.name,
                  email:element.email,
                  level:element.level,
                  mesa:(element.mesa ?? "--")
                }
                this.usuarios.push(usuario);
          }
        }
      },

      err => console.log(err)
    )
  }

}
