import {NgModule} from '@angular/core';
import {AccountRoutingModule} from './account-routing.module';
import {AccountSettingComponent} from './account-setting.component';
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AccountProfileComponent} from './account-profile.component';
@NgModule({
  imports: [
    AccountRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule,
  ],
  declarations: [
    AccountSettingComponent,
    AccountProfileComponent]
})
export class AccountModule { }
/**
 * Created by Eiston on 7/10/2017.
 */
