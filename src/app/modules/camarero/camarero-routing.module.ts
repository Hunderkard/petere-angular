import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPlatosComponent } from 'src/app/component/camarero/lista-platos/lista-platos.component';
import { CobrarComponent } from 'src/app/component/camarero/cobrar/cobrar.component';
import { QRGeneratorComponent } from 'src/app/component/camarero/qr-generator/qr-generator.component';
import { QrReaderComponent } from 'src/app/component/camarero/qr-reader/qr-reader.component';

const routes: Routes = [
  {path:"", children:[
    {path:"", component:ListaPlatosComponent},
    {path:"QR", component:QRGeneratorComponent},
    {path:"lector", component:QrReaderComponent},
    {path:"cobrar", component:CobrarComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamareroRoutingModule { }
