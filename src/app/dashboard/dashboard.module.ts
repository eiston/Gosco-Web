import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MdGridListModule} from '@angular/material';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    MdGridListModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
