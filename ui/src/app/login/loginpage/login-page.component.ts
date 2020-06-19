import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {Employee} from "../../shared/models/employee";

@Component({
  selector: 'app-loginpage',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  validationErrors = {
    login: [
      { type: 'required', message: 'Введите логин'}
    ],
    password: [
      { type: 'required', message: 'Введите пароль'}
    ]
  };
  form: FormGroup;
  emp: Employee = new Employee();
  errorMessage = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    if (this.tokenStorage.getToken()) {
      console.log('token is');
      this.reloadPage();
    }
  }

  initForm(){
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.emp.login = this.form.get("login").value;
    this.emp.password = this.form.get("password").value;
    this.authService.login(this.emp).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);
        this.tokenStorage.saveRights(data.rights);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage() {
    this.router.navigate(['']);
  }
}
