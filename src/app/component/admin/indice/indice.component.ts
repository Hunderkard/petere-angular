import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/service/datos.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {

    tokenErr = false;

  constructor(private server:DatosService) {
    this.server.getProveedores().subscribe(
        data => {
            console.log(data);
            if(data['Ojito']) this.tokenErr = true;
          },
        err => console.error(err)
      )
   }

  ngOnInit(): void {
  }

}
