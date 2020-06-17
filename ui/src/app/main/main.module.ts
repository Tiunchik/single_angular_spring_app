import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [MainComponent, NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
