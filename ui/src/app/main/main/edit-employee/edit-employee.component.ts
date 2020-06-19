import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../shared/models/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {EmployeeService} from "../../../shared/services/employee.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private token: TokenStorageService,
              private employeeService: EmployeeService) {
  }

  validationErrors = {
    name: [
      {type: 'required', message: 'Enter name'}
    ],
    patronim: [
      {type: 'required', message: 'Enter patronymic'}
    ],
    surname: [
      {type: 'required', message: 'Enter surname'}
    ],
    born: [
      {type: 'required', message: 'Enter day of birthday'}
    ],
    post: [
      {type: 'required', message: 'Enter your current position'}
    ],
    start: [
      {type: 'required', message: 'Enter first day of work'}
    ],
    login: [
      {type: 'required', message: 'Enter login'}
    ],
    password: [
      {type: 'required', message: 'Enter password'}
    ],
    rights: [
      {type: 'required', message: 'Enter rights level'}
    ],
  };

  form: FormGroup;
  employee: Employee;
  rights: string = this.token.getRights();
  id: string;

  ngOnInit(): void {
    this.initNewForm();
  }

  // private findID() {
  //   this.router.params.subscribe(params => {
  //     if (params.id &&)
  //   })
  //     })
  //   )
  // }

  private initNewForm() {
    if (this.rights === 'ROLE_ADMIN') {
      this.form = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        patronim: ['', Validators.required],
        surname: ['', Validators.required],
        born: ['', Validators.required],
        post: ['', Validators.required],
        start: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required],
        right: ['', Validators.required]
      });
    } else {
      this.form = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        patronim: ['', Validators.required],
        surname: ['', Validators.required],
        born: ['', Validators.required],
        post: ['', Validators.required],
        start: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required],
        right: ['']
      });
    }
  }

  submitForm() {
    this.employee.name = this.form.get('name').value;
    this.employee.patronim = this.form.get('patronim').value;
    this.employee.surname = this.form.get('surname').value;
    this.employee.born = this.form.get('born').value;
    this.employee.post = this.form.get('post').value;
    this.employee.start = this.form.get('start').value;
    this.employee.login = this.form.get('login').value;
    this.employee.password = this.form.get('password').value;
    if (this.rights === 'ROLE_ADMIN') {
      this.employee.rights = this.form.get('right').value;
    } else {
      this.employee.rights = 'ROLE_USER';
    }
    this.employeeService.update(this.employee);
  }

}

