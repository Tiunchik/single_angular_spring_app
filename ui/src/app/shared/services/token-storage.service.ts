import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const RIGHTS_KEY = 'auth-rights';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(login: string) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, login);
  }

  public getUser() {
    return sessionStorage.getItem(USER_KEY);
  }

  public saveRights(rights: string) {
    window.sessionStorage.removeItem(RIGHTS_KEY);
    window.sessionStorage.setItem(RIGHTS_KEY, rights);
  }

  public getRights() {
    return sessionStorage.getItem(RIGHTS_KEY);
  }
}
