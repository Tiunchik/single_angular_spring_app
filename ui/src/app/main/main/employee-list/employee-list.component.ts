import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../shared/services/employee.service";
import {Employee} from "../../../shared/models/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {
  }

  public employees: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService
      .get()
      .subscribe(data => this.employees = data);
  }

}
