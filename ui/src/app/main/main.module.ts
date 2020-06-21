import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultPageComponent } from './main/default-page/default-page.component';
import { EmployeeListComponent } from './main/employee-list/employee-list.component';
import { EditEmployeeComponent } from './main/edit-employee/edit-employee.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HolidayListComponent } from './main/holiday-list/holiday-list.component';
import { EditHolidayComponent } from './main/edit-holiday/edit-holiday.component';


@NgModule({
  declarations: [MainComponent, NavBarComponent, FooterComponent, DefaultPageComponent, EmployeeListComponent, EditEmployeeComponent, HolidayListComponent, EditHolidayComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
