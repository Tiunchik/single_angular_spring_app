import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../shared/services/employee.service";
import {Employee} from "../../../shared/models/employee";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  public employees: Employee[] = [];
  public adminMode: boolean = false;

  ngOnInit(): void {
    this.loadEmployee();
    this.enableAdmin();
  }

  loadEmployee() {
    this.employeeService
      .get()
      .subscribe(data => this.employees = data);
  }

  enableAdmin() {
    if (this.router.url === '/admin') {
      this.adminMode = true;
    }
  }

  goToEdit(id) {
    if (this.adminMode) {
      this.router.navigate(['/employee', id]);
    } else {
      this.router.navigate(['/holiday', id]);
    }
  }

}
