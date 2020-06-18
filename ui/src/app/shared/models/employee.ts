export class Employee {

  constructor(
    public id?: number,
    public name?: string,
    public patronim?: string,
    public surname?: string,
    public born?: Date,
    public post?: string,
    public start?: Date,
    public login?: string,
    public password?: string,
    public rights?: String
  ) {
  }

}

// private long id;
//
// private String name;
//
// private String patronim;
//
// private String surname;
//
// private Date born;
//
// private String post;
//
// private Date start;
//
// @Column(unique = true)
// private String login;
//
// private String password;
//
// private String rights;
