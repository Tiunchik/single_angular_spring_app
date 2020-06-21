import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../shared/models/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {EmployeeService} from "../../../shared/services/employee.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
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
      {type: 'required', message: 'Enter current position'}
    ],
    num: [
      {type: 'required', message: 'Enter employee number'}
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
  employee: Employee = {};
  rights: string = this.token.getRights();
  id: string;
  update: boolean = false;

  ngOnInit(): void {
    this.initNewForm();
    this.createOrUpdate();
  }

  private createOrUpdate() {
    const id = this.route.snapshot.params.id;
    if (id && id !== 'new') {
      this.employeeService.getById(id).subscribe(data => {
        this.employee = data;
        this.fillInForm();
        this.update = true;
      });
    }
  }


  private initNewForm() {
    if (this.rights === 'ROLE_ADMIN') {
      this.form = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        patronim: ['', Validators.required],
        surname: ['', Validators.required],
        born: ['', Validators.required],
        post: ['', Validators.required],
        num: ['', Validators.required],
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
        num: ['', Validators.required],
        start: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required],
        right: ['']
      });
    }
  }

  private fillInForm() {
    this.form.get('id').setValue(this.employee.id);
    this.form.get('name').setValue(this.employee.name);
    this.form.get('patronim').setValue(this.employee.patronim);
    this.form.get('surname').setValue(this.employee.surname);
    this.form.get('born').setValue(this.employee.born);
    this.form.get('post').setValue(this.employee.post);
    this.form.get('num').setValue(this.employee.num);
    this.form.get('start').setValue(this.employee.start);
    this.form.get('login').setValue(this.employee.login);
    this.form.get('password').setValue(this.employee.password);
    if (this.employee.rights === 'ROLE_USER') {
      this.form.get('right').setValue('USER');
    } else {
      this.form.get('right').setValue('ADMIN');
    }
  }

  submitForm() {
    this.employee.name = this.form.get('name').value;
    this.employee.patronim = this.form.get('patronim').value;
    this.employee.surname = this.form.get('surname').value;
    this.employee.born = this.form.get('born').value;
    this.employee.post = this.form.get('post').value;
    this.employee.num = this.form.get('num').value;
    this.employee.start = this.form.get('start').value;
    this.employee.login = this.form.get('login').value;
    this.employee.password = this.form.get('password').value;
    if (this.rights === 'ROLE_ADMIN') {
      this.employee.rights = this.form.get('right').value;
    } else {
      this.employee.rights = 'ROLE_USER';
    }
    if (this.update) {
      console.log(this.update);
      this.employeeService.update(this.employee)
        .subscribe(() => this.router.navigate(['/admin']));
    } else {
      this.employeeService.save(this.employee)
        .subscribe(() => this.router.navigate(['/employee']));
    }
  }

}

