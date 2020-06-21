import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../shared/models/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {EmployeeService} from "../../../shared/services/employee.service";
import {HolidayService} from "../../../shared/services/holiday.service";
import {Holiday} from "../../../shared/models/holiday";

@Component({
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.css']
})
export class EditHolidayComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService,
              private employeeService: EmployeeService,
              private holidayService: HolidayService) {
  }

  validationErrors = {
    employee: [
      {type: 'required', message: 'Enter choose employee'}
    ],
    start: [
      {type: 'required', message: 'Enter first date of holiday'}
    ],
    finish: [
      {type: 'required', message: 'Enter las date of holiday'}
    ]
  };

  form: FormGroup;
  employees: Employee[] = [];
  employee: Employee;
  holiday: Holiday = {};
  id;
  holid;
  update: boolean = false;
  valid: boolean = true;

  ngOnInit(): void {
    this.preparePage();
    this.initForm();
    this.fillInForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      employee: [{
        value: [],
        disabled: !this.checkID()
      }],
      start: ['', Validators.required],
      finish: ['', Validators.required]
    });
  }

  preparePage() {
    this.id = this.route.snapshot.params.id;
    if (this.id && this.checkID()) {
      this.employeeService.get()
        .subscribe(data => this.employees = data);
    } else {
      this.employeeService.getById(this.id)
        .subscribe(data => {
          this.employees = [data];
          this.employee = data;
        });
    }
  }

  fillInForm() {
    this.holid = this.route.snapshot.params.holid;
    if (this.holid && this.holid !== 'new') {
      this.holidayService.getById(this.holid)
        .subscribe(data => {
          this.holiday = data;
          this.form.get('start').setValue(data.start);
          this.form.get('finish').setValue(data.finish);
        });
    }
  }

  onChange(id) {
    this.employee = this.employees.filter(x => x.id == id).shift();
  }

  checkID(): boolean {
    console.log(this.id);
    return this.id === 'new';
  }

  checkDates() {
    const str: Date = new Date(this.form.get('start').value);
    const fns: Date = new Date(this.form.get('finish').value);
    if (str !== null && fns !== null && this.employee !== null && fns > str) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  submitForm() {
    this.holiday.employee = this.employee;
    this.holiday.start = this.form.get('start').value;
    this.holiday.finish = this.form.get('finish').value;
    if (this.id == ' new' || this.holid == 'new') {
      this.holidayService.save(this.holiday)
        .subscribe(() => {
          this.router.navigate(['/holiday', this.employee.id])
        });
    } else {
      this.holidayService.update(this.holiday)
        .subscribe(() => {
          this.router.navigate(['/holiday', this.employee.id])
        });
    }
  }
}

