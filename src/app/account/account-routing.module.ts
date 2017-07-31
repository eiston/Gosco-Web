import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AccountSettingComponent} from './account-setting.component';
import {AccountProfileComponent} from './account-profile.component';

/**
 * Created by Eiston on 7/10/2017.
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'Account'
    },
    children: [
      {
        path: 'account-settings',
        component: AccountSettingComponent,
        data: {
          title: 'Settings'
        }
      },
      {
        path: 'profile',
        component: AccountProfileComponent,
        data: {
          title: 'Profile'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
