import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ValveAddComponent} from './valve-add.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-valve',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'Valve'
    },
    children: [
      {
        path: 'add-valve',
        component: ValveAddComponent,
        data: {
          title: 'Add Valve'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValveRoutingModule {}
/**
 * Created by Eiston on 7/29/2017.
 */
