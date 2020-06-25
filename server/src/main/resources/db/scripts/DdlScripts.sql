create table if not exists employee
(id int8 not null,
born date,
login varchar(255),
name varchar(255),
num int4,
password varchar(255),
patronim varchar(255),
post varchar(255),
rights varchar(255),
start date,
surname varchar(255),
primary key (id));

create table if not exists holiday
(id int8 not null,
finish date,
start date,
employee_id int8,
primary key (id));

alter table employee add constraint UK_indexLogin unique (login);

alter table employee add constraint UK_indexNum unique (num);

alter table holiday add constraint EMPLOYEE_ID_FK foreign key (employee_id) references employee;
