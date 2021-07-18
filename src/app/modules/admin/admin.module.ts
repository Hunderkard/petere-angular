import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//pl  FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//pl  ROUTING PERSONALIZADO
import { AdminRoutingModule } from './admin-routing.module';

// ro UTILIDADES=========================================== 
import { TirarComponent } from 'src/app/component/admin/calculadoras/tirar/tirar.component';
import { ComprarComponent } from 'src/app/component/admin/calculadoras/comprar/comprar.component';
import { EscandalloComponent } from 'src/app/component/admin/calculadoras/escandallo/escandallo.component';

// fa PLATOS===============================================
import { FormPlatoComponent } from 'src/app/component/admin/formularios/form/form-plato/form-plato.component';
import { VisPlatosComponent } from 'src/app/component/admin/vistas/vis/vis-platos/vis-platos.component';
import { ShowPlatoComponent } from 'src/app/component/admin/vistas/show/show-plato/show-plato.component';
import { EditPlatoComponent } from 'src/app/component/admin/formularios/edit/edit-plato/edit-plato.component';
// fa USUARIOS=============================================
import { FormUserComponent } from 'src/app/component/admin/formularios/form/form-user/form-user.component';
import { VisUsersComponent } from 'src/app/component/admin/vistas/vis/vis-users/vis-users.component';
import { ShowUserComponent } from 'src/app/component/admin/vistas/show/show-user/show-user.component';
// fa PROVEEDORES==========================================
import { FormProveedorComponent } from 'src/app/component/admin/formularios/form/form-proveedor/form-proveedor.component';
import { VisProveedoresComponent } from 'src/app/component/admin/vistas/vis/vis-proveedores/vis-proveedores.component';
import { ShowProveedorComponent } from 'src/app/component/admin/vistas/show/show-proveedor/show-proveedor.component';
import { EditProveedorComponent } from 'src/app/component/admin/formularios/edit/edit-proveedor/edit-proveedor.component';
// fa INGREDIENTES=========================================
import { FormIngredienteComponent } from 'src/app/component/admin/formularios/form/form-ingrediente/form-ingrediente.component';
import { VisIngredientesComponent } from 'src/app/component/admin/vistas/vis/vis-ingredientes/vis-ingredientes.component';
import { ShowIngredienteComponent } from 'src/app/component/admin/vistas/show/show-ingrediente/show-ingrediente.component';
import { EditIngredienteComponent } from 'src/app/component/admin/formularios/edit/edit-ingrediente/edit-ingrediente.component';

// ro VOY CONTIGO PIPO PIPO PIPO===========================
import { CantidadPipe } from 'src/app/pipo/cantidad.pipe';
import { NombrePipe } from 'src/app/pipo/nombre.pipe';



@NgModule({
  declarations: [
    //fa FORMULARIOS=========
    FormPlatoComponent,
    FormProveedorComponent,
    FormIngredienteComponent,
    FormUserComponent,
    // fa VISTAS=============
    VisIngredientesComponent,
    VisProveedoresComponent,
    VisUsersComponent,
    VisPlatosComponent,
    // fa SHOWS==============
    ShowIngredienteComponent,
    ShowProveedorComponent,
    ShowUserComponent,
    ShowPlatoComponent,
    // fa EDITS==============
    EditIngredienteComponent,
    EditProveedorComponent,
    EditPlatoComponent,
    // ro UTILIDADES=========
    EscandalloComponent,
    ComprarComponent,
    TirarComponent,
    // ro PIPO PIPO PIPO
    NombrePipe,
    CantidadPipe,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
