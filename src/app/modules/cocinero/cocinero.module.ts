import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocineroRoutingModule } from './cocinero-routing.module';

import { ListaPedidosComponent } from 'src/app/component/cocinero/lista-pedidos/lista-pedidos.component';
import { ListaMesasComponent } from 'src/app/component/cocinero/lista-mesas/lista-mesas.component';
import { DetalleMesaComponent } from 'src/app/component/cocinero/detalle-mesa/detalle-mesa.component';



@NgModule({
  declarations: [
    ListaPedidosComponent,
    ListaMesasComponent,
    DetalleMesaComponent,
  ],
  imports: [
    CommonModule,
    CocineroRoutingModule,

  ]
})
export class CocineroModule { }
