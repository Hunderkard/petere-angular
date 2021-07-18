import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ti COMPONENTES- Para direccionar la ruta.
import { LoginComponent } from './component/formularios/login/login.component';
import { RegisterComponent } from './component/formularios/register/register.component';
import { RequestResetComponent } from './component/formularios/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './component/formularios/password/response-reset/response-reset.component';
// ag 
import { MenuComponent } from './component/menu/menu.component';
import { PerfilComponent } from './component/home/perfil.component';
// ti SERVICIOS- Para comprobar los permisos.
import { PrelogService } from './service/CanActive/prelog.service';
import { PostlogService } from './service/CanActive/postlog.service';
import { AdminlogService } from './service/CanActive/adminlog.service';
import { CocinerologService } from './service/CanActive/cocinerolog.service';
import { CamarerologService } from './service/CanActive/camarerolog.service';

import { ReservaComponent } from './component/formularios/reserva/reserva.component';
import { CogerMesaComponent } from './component/cliente/coger-mesa/coger-mesa.component';
import { AbandonarMesaComponent } from './component/cliente/abandonar-mesa/abandonar-mesa.component';

const routes: Routes = [
  { path:"home", component:PerfilComponent},
  { path:"", component:MenuComponent},
  { path:"reserva", component:ReservaComponent},
  { path:"carta", component:MenuComponent},
  // { path:"QR", component:QRGeneratorComponent},


  {path:"", canActivate:[PrelogService], children:[
    { path:"login", component:LoginComponent},
    { path:"register", component:RegisterComponent},
    { path:"req-password-reset", component: RequestResetComponent},
    { path:"res-password-reset", component: ResponseResetComponent},
  ]},

  {path:"", canActivate:[PostlogService], children:[
    { path:"mesa", component:CogerMesaComponent},
    { path:"mesa/:id", component:AbandonarMesaComponent},
    // { path:"cocina/mesas", component:ListaMesasComponent},
    {
      path:"admin",
      canActivate:[AdminlogService],
      loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)  
    },
    {
      path:"cocina",
      canActivate:[CocinerologService], 
      loadChildren: () => import('./modules/cocinero/cocinero.module').then(m => m.CocineroModule)  
    },
    {
      path:"camarero",
      canActivate:[CamarerologService],
      loadChildren: () => import('./modules/camarero/camarero.module').then(m => m.CamareroModule)
    }

  ]},
  { path:"**", redirectTo:"carta"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    // {scrollPositionRestoration: 'enabled'}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
