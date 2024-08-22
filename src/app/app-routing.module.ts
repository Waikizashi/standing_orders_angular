import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingOrdersListComponent } from './standing-order/list/standing-orders-list.component';
import { StandingOrderFormComponent } from './standing-order/form/standing-order-form.component';

const routes: Routes = [
  { path: 'standing-orders', component: StandingOrdersListComponent },
  { path: 'create-new', component: StandingOrderFormComponent, data: { edit: true } },
  { path: 'standing-order/:id/view', component: StandingOrderFormComponent, data: { edit: false } },
  { path: 'standing-order/:id/edit', component: StandingOrderFormComponent, data: { edit: true } },
  { path: '', redirectTo: 'standing-orders', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
