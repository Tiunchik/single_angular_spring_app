import { Component, OnInit } from '@angular/core';
import {Employee} from "../../shared/models/employee";
import {AuthService} from "../../shared/services/auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: Employee;

  constructor(private token: TokenStorageService) { }



  ngOnInit(): void {
  }

}
