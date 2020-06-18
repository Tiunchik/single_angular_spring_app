import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultPageComponent } from './main/default-page/default-page.component';


@NgModule({
  declarations: [MainComponent, NavBarComponent, FooterComponent, DefaultPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
