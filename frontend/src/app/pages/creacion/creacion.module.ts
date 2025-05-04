import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacionPageRoutingModule } from './creacion-routing.module';

import { CreacionPage } from './creacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacionPageRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [CreacionPage]
})
export class CreacionPageModule {}
