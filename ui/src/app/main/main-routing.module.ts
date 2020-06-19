import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import {DefaultPageComponent} from "./main/default-page/default-page.component";
import {EmployeeListComponent} from "./main/employee-list/employee-list.component";
import {EditEmployeeComponent} from "./main/edit-employee/edit-employee.component";


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', component: DefaultPageComponent},
      {path: 'employee', component: EmployeeListComponent},
      {path: 'employee/:id', component: EditEmployeeComponent},
      // {path: 'login', loadChildren: () => import('../login/login.module').then(mod => mod.LoginModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
