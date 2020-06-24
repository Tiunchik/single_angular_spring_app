import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../shared/services/employee.service";
import {Employee} from "../../../shared/models/employee";
import {Router} from "@angular/router";
import {ExcelService} from "../../../shared/services/excel.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private excelService: ExcelService,
              private router: Router) {
  }

  public employees: Employee[] = [];
  public sortedEmployee: Employee[] = [];
  public adminMode: boolean = false;
  public showed = {
    Number: 'Number',
    Name: 'Name',
    Patronim: 'Patronymic',
    Surname: 'Surname',
    DOB: 'DOB',
    Position: 'Position',
    DOS: 'DOS'
  };
  private sortingWay: boolean = true;
  private lastSortedRow: string;

  ngOnInit(): void {
    this.loadEmployee();
    this.enableAdmin();
  }

  loadEmployee() {
    this.employeeService
      .get()
      .subscribe(data => {
          this.employees = data;
          this.sortedEmployee = data;
        }
      )
    ;
  }

  enableAdmin() {
    if (this.router.url === '/admin') {
      this.adminMode = true;
    }
  }

  loadExcel() {
    this.excelService.download().subscribe(
      (response: any) => {
        saveAs(response, 'holiday.xlxs');
      });
  }

  goToEdit(id) {
    if (this.adminMode) {
      this.router.navigate(['/employee', id]);
    } else {
      this.router.navigate(['/holiday', id]);
    }
  }

  clear() {
    this.showed = {
      Number: 'Number',
      Name: 'Name',
      Patronim: 'Patronymic',
      Surname: 'Surname',
      DOB: 'DOB',
      Position: 'Position',
      DOS: 'DOS'
    };
  }

  sortByNum() {
    this.clear();
    if (this.lastSortedRow != 'number') {
      this.lastSortedRow = 'number';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.Number = 'Number↓';
        return x.num - y.num;
      } else {
        this.showed.Number = 'Number↑';
        return y.num - x.num;
      }
    });
  }

  sortByName() {
    this.clear();
    if (this.lastSortedRow != 'name') {
      this.lastSortedRow = 'name';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.Name = 'Name↓';
        if (x.name > y.name) {
          return 1;
        }
        if (x.name > y.name) {
          return -1;
        }
        return 0;
      } else {
        this.showed.Name = 'Name↑';
        if (y.name > x.name) {
          return 1;
        }
        if (y.name > x.name) {
          return -1;
        }
        return 0;
      }
    });
  }

  sortByPatronim() {
    this.clear();
    if (this.lastSortedRow != 'patronim') {
      this.lastSortedRow = 'patronim';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.Patronim = 'Patronymic↓';
        if (x.patronim > y.patronim) {
          return 1;
        }
        if (x.patronim > y.patronim) {
          return -1;
        }
        return 0;
      } else {
        this.showed.Patronim = 'Patronymic↑';
        if (y.patronim > x.patronim) {
          return 1;
        }
        if (y.patronim > x.patronim) {
          return -1;
        }
        return 0;
      }
    });
  }

  sortBySurname() {
    this.clear();
    if (this.lastSortedRow != 'surname') {
      this.lastSortedRow = 'surname';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.Surname = 'Surname↓';
        if (x.surname > y.surname) {
          return 1;
        }
        if (x.surname > y.surname) {
          return -1;
        }
        return 0;
      } else {
        this.showed.Surname = 'Surname↑';
        if (y.surname > x.surname) {
          return 1;
        }
        if (y.surname > x.surname) {
          return -1;
        }
        return 0;
      }
    });
  }

  sortByPosition() {
    this.clear();
    if (this.lastSortedRow != 'post') {
      this.lastSortedRow = 'post';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.Position = 'Position↓';
        if (x.post > y.post) {
          return 1;
        }
        if (x.post > y.post) {
          return -1;
        }
        return 0;
      } else {
        this.showed.Position = 'Position↑';
        if (y.post > x.post) {
          return 1;
        }
        if (y.post > x.post) {
          return -1;
        }
        return 0;
      }
    });
  }

  sortByDOB() {
    this.clear();
    if (this.lastSortedRow != 'born') {
      this.lastSortedRow = 'born';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.DOB = 'DOB↑';
        if (x.born > y.born) {
          return 1;
        }
        if (x.born > y.born) {
          return -1;
        }
        return 0;
      } else {
        this.showed.DOB = 'DOB↓';
        if (y.born > x.born) {
          return 1;
        }
        if (y.born > x.born) {
          return -1;
        }
        return 0;
      }
    });
  }

  sortByDOS() {
    this.clear();
    if (this.lastSortedRow != 'start') {
      this.lastSortedRow = 'start';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedEmployee = this.sortedEmployee.sort((x: Employee, y: Employee) => {
      if (this.sortingWay) {
        this.showed.DOS = 'DOS↓';
        if (x.start > y.start) {
          return 1;
        }
        if (x.start > y.start) {
          return -1;
        }
        return 0;
      } else {
        this.showed.DOS = 'DOS↑';
        if (y.start > x.start) {
          return 1;
        }
        if (y.start > x.start) {
          return -1;
        }
        return 0;
      }
    });
  }
}
