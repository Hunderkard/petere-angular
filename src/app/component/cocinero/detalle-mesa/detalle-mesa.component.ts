import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'detalle-mesa',
  templateUrl: './detalle-mesa.component.html',
  styleUrls: ['./detalle-mesa.component.scss']
})
export class DetalleMesaComponent implements OnInit {

@Input() mesa;

  constructor() { }

  ngOnInit(): void {
  }

}
