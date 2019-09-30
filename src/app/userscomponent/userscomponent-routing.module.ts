import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserscomponentComponent } from './userscomponent.component';

const routes: Routes = [
  {
    path: '',
    component: UserscomponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserscomponentRoutingModule { }
