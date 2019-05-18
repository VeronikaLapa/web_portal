import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import {UserLoginFormComponent} from './user-login-form/user-login-form.component';

const routes: Routes = [
  { path: 'api/user/all', component: UserListComponent },
  { path: 'api/user', component: UserFormComponent },
  { path: 'api/user/in', component: UserLoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
