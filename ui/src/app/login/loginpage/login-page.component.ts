import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

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
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  rights: string ='';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.rights = this.tokenStorage.getRights();
    }
  }

  initForm(){
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.login);
        this.tokenStorage.saveRights(data.rights);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.rights = this.tokenStorage.getRights();
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    this.router.navigate(['']);
  }
}
