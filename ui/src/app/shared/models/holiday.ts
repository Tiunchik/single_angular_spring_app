import {Employee} from "./employee";

export class Holiday {

  constructor(
    public id: number,
    public employee: Employee,
    public start: Date,
    public finish: Date
  ) {
  }
}

// private long id;
//
// private Employee employee;
//
// private Date start;
//
// private Date finish;
