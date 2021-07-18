import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgQrScannerModule } from 'ngx-qr';

//pl ADMIN, CAMAREROS, COCINEROS, CLIENTES
import {SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// pl CAMAREROS
import { QRCodeModule } from 'angularx-qrcode';
// pl CLIENTES
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './init/app.component';

// pl TODOS
import { CabeceraComponent } from './component/layout/cabecera/cabecera.component';
import { CabNoIdenComponent } from './component/layout/cab-no-iden/cab-no-iden.component';

import { FooterComponent } from './component/layout/footer/footer.component';

import { RegisterComponent } from './component/formularios/register/register.component';
import { LoginComponent } from './component/formularios/login/login.component';
import { PerfilComponent } from './component/home/perfil.component';
import { RequestResetComponent } from './component/formularios/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './component/formularios/password/response-reset/response-reset.component';

import { MenuComponent } from './component/menu/menu.component';

import { ReservaComponent } from './component/formularios/reserva/reserva.component';

import { CogerMesaComponent } from './component/cliente/coger-mesa/coger-mesa.component';

// ti VOY CONTIGO PIPO PIPO PIPO
import { ListaPipe } from './pipo/lista.pipe';

// import { DocumentComponent } from './component/document/document/document.component';
// import { DocumentListComponent } from './component/document/document-list/document-list.component';

// no CAMARERO
import { ListaAyudaComponent } from './component/camarero/lista-ayuda/lista-ayuda.component';
import { ListaPlatosComponent } from './component/camarero/lista-platos/lista-platos.component';
import { QRGeneratorComponent } from './component/camarero/qr-generator/qr-generator.component';
import { CabAdminComponent } from './component/layout/cab-admin/cab-admin.component';
import { CabClienteComponent } from './component/layout/cab-cliente/cab-cliente.component';
import { CabCamareroComponent } from './component/layout/cab-camarero/cab-camarero.component';
import { CabCocinaComponent } from './component/layout/cab-cocina/cab-cocina.component';
import { NeveraComponent } from './component/cocinero/nevera/nevera.component';
import { IndiceComponent } from './component/admin/indice/indice.component';
import { AbandonarMesaComponent } from './component/cliente/abandonar-mesa/abandonar-mesa.component';
import { CobrarComponent } from './component/camarero/cobrar/cobrar.component';
import { CajaComponent } from './component/admin/calculadoras/caja/caja.component';
import { QrReaderComponent } from './component/camarero/qr-reader/qr-reader.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    FooterComponent,
    
    LoginComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,

    PerfilComponent,
    MenuComponent,

    ListaPipe,
    ReservaComponent,
    CogerMesaComponent,
    
    ListaAyudaComponent,
    ListaPlatosComponent,
    QRGeneratorComponent,

    CabNoIdenComponent,
    CabAdminComponent,
    CabClienteComponent,
    CabCamareroComponent,
    CabCocinaComponent,

    NeveraComponent,

    IndiceComponent,

    AbandonarMesaComponent,

    CobrarComponent,

    CajaComponent,

    QrReaderComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    NgQrScannerModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
