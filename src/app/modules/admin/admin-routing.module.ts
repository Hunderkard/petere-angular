import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ro UTILIDADES
import { ComprarComponent } from 'src/app/component/admin/calculadoras/comprar/comprar.component';
import { EscandalloComponent } from 'src/app/component/admin/calculadoras/escandallo/escandallo.component';
import { TirarComponent } from 'src/app/component/admin/calculadoras/tirar/tirar.component';

import { IndiceComponent } from 'src/app/component/admin/indice/indice.component';

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
import { ShowIngredienteComponent } from 'src/app/component/admin/vistas/show/show-ingrediente/show-ingrediente.component';
import { EditIngredienteComponent } from 'src/app/component/admin/formularios/edit/edit-ingrediente/edit-ingrediente.component';
import { VisIngredientesComponent } from 'src/app/component/admin/vistas/vis/vis-ingredientes/vis-ingredientes.component';
import { FormIngredienteComponent } from 'src/app/component/admin/formularios/form/form-ingrediente/form-ingrediente.component';
import { CajaComponent } from 'src/app/component/admin/calculadoras/caja/caja.component';


const routes: Routes = [
     { path:"", children:[
      { path:"home", component:IndiceComponent},

      { path:"calculadora", component:EscandalloComponent},
      { path:"comprar", component:ComprarComponent},
      { path:"tirar", component:TirarComponent},
      { path:"caja", component: CajaComponent},

      { path:"ingrediente/create", component:FormIngredienteComponent},
      { path:"ingredientes", component:VisIngredientesComponent},
      { path:"ingrediente/:id", component:ShowIngredienteComponent },
      { path:"ingrediente/:id/edit", component:EditIngredienteComponent },

      { path:"proveedor/create", component:FormProveedorComponent},
      { path:"proveedores", component:VisProveedoresComponent},
      { path:"proveedor/:id", component:ShowProveedorComponent},
      { path: "proveedor/:id/edit", component:EditProveedorComponent},
      
      { path:"plato/create", component:FormPlatoComponent},
      { path:"platos", component:VisPlatosComponent},
      { path:"plato/:id", component:ShowPlatoComponent},
      { path:"plato/:id/edit", component:EditPlatoComponent},

      { path: "user/create", component:FormUserComponent},
      { path: "users", component:VisUsersComponent},
      { path: "user/:id", component:ShowUserComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
