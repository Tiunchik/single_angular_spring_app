import {Component, OnInit} from '@angular/core';
import {Holiday} from "../../../shared/models/holiday";
import {HolidayService} from "../../../shared/services/holiday.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  public id: string;

  ngOnInit(): void {
    this.preparePage();
  }

  preparePage() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.holidayService
        .getByEmployeeId(this.id)
        .subscribe(data => this.holidays = data);
    } else {
      this.holidayService
        .get()
        .subscribe(data => this.holidays = data);
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
}
