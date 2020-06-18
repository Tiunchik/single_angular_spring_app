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
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: string) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, user);
  }

  public getUser() {
    return localStorage.getItem(USER_KEY);
  }

  public saveRights(rights: string) {
    window.localStorage.removeItem(RIGHTS_KEY);
    window.localStorage.setItem(RIGHTS_KEY, rights);
  }

  public getRights() {
    return localStorage.getItem(RIGHTS_KEY);
  }
}
