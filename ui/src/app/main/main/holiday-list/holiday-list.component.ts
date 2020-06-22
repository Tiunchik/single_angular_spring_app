import {Component, OnInit} from '@angular/core';
import {Holiday} from "../../../shared/models/holiday";
import {HolidayService} from "../../../shared/services/holiday.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../../shared/models/employee";

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {

  constructor(private holidayService: HolidayService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public holidays: Holiday[] = [];
  public sortedHoliday: Holiday[] = [];
  public id: string;
  private sortingWay: boolean = true;
  private lastSortedRow: string;
  public showed = {
    Number: 'Employee number',
    Name: 'Employee name',
    Surname: 'Employee surname',
    DOS: 'Holiday start',
    DOF: 'Holiday finish'
  };
  public filter = {
    Number: '',
    Name: '',
    Surname: '',
    DOS: '',
    DOF: ''
  };

  ngOnInit(): void {
    this.preparePage();
  }

  preparePage() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.holidayService
        .getByEmployeeId(this.id)
        .subscribe(data => {
          this.holidays = data;
          this.sortedHoliday = data;
        });
    } else {
      this.holidayService
        .get()
        .subscribe(data => {
          this.holidays = data;
          this.sortedHoliday = data;
        });
    }
  }

  goToCreate() {
    if (this.id) {
      this.router.navigate(['/holiday', this.id, 'new']);
    } else {
      this.router.navigate(['/holiday', 'new', 'new']);
    }
  }

  goToEdit(id, holid) {
    this.router.navigate(['holiday', id, holid]);
  }

  clear() {
    this.showed = {
      Number: 'Employee number',
      Name: 'Employee name',
      Surname: 'Employee surname',
      DOS: 'Holiday start',
      DOF: 'Holiday finish'
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
    this.sortedHoliday = this.sortedHoliday.sort((x: Holiday, y: Holiday) => {
      if (this.sortingWay) {
        this.showed.Number = 'Employee number↓';
        return x.employee.num - y.employee.num;
      } else {
        this.showed.Number = 'Employee number↑';
        return y.employee.num - x.employee.num;
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
    this.sortedHoliday = this.sortedHoliday.sort((x: Holiday, y: Holiday) => {
      if (this.sortingWay) {
        this.showed.Name = 'Employee name↓';
        if (x.employee.surname > y.employee.surname) {
          return 1;
        }
        if (x.start > y.start) {
          return -1;
        }
        return 0;
      } else {
        this.showed.Name = 'Employee name↑';
        if (y.employee.surname > x.employee.surname) {
          return 1;
        }
        if (y.employee.surname > x.employee.surname) {
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
    this.sortedHoliday = this.sortedHoliday.sort((x: Holiday, y: Holiday) => {
      if (this.sortingWay) {
        this.showed.Surname = 'Employee surname↓';
        if (x.employee.surname > y.employee.surname) {
          return 1;
        }
        if (x.start > y.start) {
          return -1;
        }
        return 0;
      } else {
        this.showed.Surname = 'Employee surname↑';
        if (y.employee.surname > x.employee.surname) {
          return 1;
        }
        if (y.employee.surname > x.employee.surname) {
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
    this.sortedHoliday = this.sortedHoliday.sort((x: Holiday, y: Holiday) => {
      if (this.sortingWay) {
        this.showed.DOS = 'Holiday start↓';
        if (x.start > y.start) {
          return 1;
        }
        if (x.start > y.start) {
          return -1;
        }
        return 0;
      } else {
        this.showed.DOS = 'Holiday start↑';
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

  sortByDOF() {
    this.clear();
    if (this.lastSortedRow != 'finish') {
      this.lastSortedRow = 'finish';
      this.sortingWay = true;
    } else {
      this.sortingWay = !this.sortingWay;
    }
    this.sortedHoliday = this.sortedHoliday.sort((x: Holiday, y: Holiday) => {
      if (this.sortingWay) {
        this.showed.DOF = 'Holiday finish↑';
        if (x.finish > y.finish) {
          return 1;
        }
        if (x.finish > y.finish) {
          return -1;
        }
        return 0;
      } else {
        this.showed.DOF = 'Holiday finish↓';
        if (y.finish > x.finish) {
          return 1;
        }
        if (y.finish > x.finish) {
          return -1;
        }
        return 0;
      }
    });
  }

  doFilter() {
    if (this.filter.Number == ''
      && this.filter.Name == ''
      && this.filter.Surname == ''
      && this.filter.DOS == ''
      && this.filter.DOF == '') {
      this.sortedHoliday = this.holidays;
      this.clear();
      console.log('clear');
    }
    this.sortedHoliday = this.holidays;
    if (this.filter.Number != '') {
      const nmbr: number = Number(this.filter.Number);
      this.sortedHoliday = this.sortedHoliday.filter(x => x.employee.num == nmbr);
    }
    if (this.filter.Name != '') {
      let str: string = this.filter.Name.toLowerCase();
      let regExp =
        new RegExp('\w*(' + str + ')\w*');
      this.sortedHoliday = this.sortedHoliday.filter(x => x.employee.name.toLowerCase().match(regExp));
    }
    if (this.filter.Surname != '') {
      let str: string = this.filter.Surname.toLowerCase();
      let regExp =
        new RegExp('\w*(' + str + ')\w*');
      this.sortedHoliday = this.sortedHoliday.filter(x => x.employee.surname.toLowerCase().match(regExp));
    }
    if (this.filter.DOS != '') {
      let str: string = this.filter.DOS;
      let date: Date = new Date(Number(str.slice(0, 4)),
        Number(str.slice(5, 7)),
        Number(str.slice(8, 9)));
      this.sortedHoliday = this.sortedHoliday.filter(x => {
        let checked: Date = new Date(Number(String(x.start).slice(0, 4)),
          Number(String(x.start).slice(5, 7)),
          Number(String(x.start).slice(8, 9)));
        return checked.getTime() >= date.getTime();
      });
    }
    if (this.filter.DOF != '') {
      let str: string = this.filter.DOF;
      let date: Date = new Date(Number(str.slice(0, 4)),
        Number(str.slice(5, 7)),
        Number(str.slice(8, 9)));
      this.sortedHoliday = this.sortedHoliday.filter(x => {
        let checked: Date = new Date(Number(String(x.start).slice(0, 4)),
          Number(String(x.finish).slice(5, 7)),
          Number(String(x.finish).slice(8, 9)));
        return checked.getTime() <= date.getTime();
      });
    }
  }

}
