import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  user: string = this.tokenStorage.getUser();

  ngOnInit(): void {
  }

  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
