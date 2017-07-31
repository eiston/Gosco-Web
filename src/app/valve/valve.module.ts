import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ValveAddComponent} from './valve-add.component';
import {ValveRoutingModule} from './valve-routing.module';
import {DragulaModule} from 'ng2-dragula';
import {MdDialogModule, MdGridListModule} from '@angular/material';
@NgModule({
  imports: [
    ValveRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule,
    DragulaModule,
    MdGridListModule,
    MdDialogModule
  ],
  declarations: [ValveAddComponent]
})
export class ValveModule { }/**
 * Created by Eiston on 7/29/2017.
 */
