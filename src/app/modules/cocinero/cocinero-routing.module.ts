import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPedidosComponent } from 'src/app/component/cocinero/lista-pedidos/lista-pedidos.component';
import { NeveraComponent } from 'src/app/component/cocinero/nevera/nevera.component';


const routes: Routes = [
  {path:"", children:[
    {path:"", component: ListaPedidosComponent},
    {path:"reservas", component: NeveraComponent},
    {path:"**", redirectTo: ""},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocineroRoutingModule { }
