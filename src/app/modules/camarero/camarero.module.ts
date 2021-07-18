import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgQrScannerModule } from 'ngx-qr';

import { CamareroRoutingModule } from './camarero-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CamareroRoutingModule,
    NgQrScannerModule
  ]
})
export class CamareroModule { }
