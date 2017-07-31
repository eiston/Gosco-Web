/**
 * Created by Eiston on 7/5/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OwnershipFormComponent} from './ownership-form.component';
import {OwnershipQuestionComponent} from './ownership-question.component';
import {OwnershipResultComponent} from './ownership-result.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ownership-form',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'ownership-cost'
    },
    children: [
      {
        path: 'ownership-form',
        component: OwnershipFormComponent,
        data: {
          title: 'Ownership-Form'
        }
      },
      {
        path: 'ownership-question',
        component: OwnershipQuestionComponent,
        data: {
          title: 'Ownership-Question'
        }
      },
      {
        path: 'ownership-result',
        component: OwnershipResultComponent,
        data: {
          title: 'Ownership-Result'
        }
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnershipRoutingModule {}
