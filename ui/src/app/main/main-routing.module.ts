import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      // {path: '', component: StartPage},
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
