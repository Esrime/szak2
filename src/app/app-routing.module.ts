import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdetailComponent } from './classes/cdetail/cdetail.component';
import { ClassformComponent } from './classes/classform/classform.component';
import { ClistComponent } from './classes/clist/clist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailComponent } from './sets/detail/detail.component';
import { ListComponent } from './sets/list/list.component';
import { PracticeComponent } from './sets/practice/practice.component';
import { SetformComponent } from './sets/setform/setform.component';
import { TdetailComponent } from './test/tdetail/tdetail.component';
import { TestformComponent } from './test/testform/testform.component';
import { TpracticeComponent } from './test/tpractice/tpractice.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "sets", component: ListComponent },
  { path: "sets/new", component: SetformComponent },
  { path: "sets/detail/:id", component: DetailComponent },
  { path: "sets/detail/:id/edit", component: SetformComponent },
  { path: "sets/practice/:id/:timed", component: PracticeComponent },
  { path: "classes", component: ClistComponent },
  { path: "classes/new", component: ClassformComponent },
  { path: "class/detail/:id", component: CdetailComponent },
  // { path: "class/detail/:id/edit", component: CdetailComponent },
  { path: "class/detail/:id/testdetail/:tid", component: TdetailComponent },
  { path: "class/detail/:id/testdetail/:tid/practice", component: TpracticeComponent },
  { path: "class/detail/:id/testedit", component: TestformComponent },
  { path: "login", component: LoginComponent },
  { path: "user", component: HomeComponent },
  // { path: "not-found", component: NotFoundComponent },
  // { path: "**", redirectTo:'/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
