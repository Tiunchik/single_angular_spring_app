insert into employee (id, born, login, name, num, password, patronim, post, rights, start, surname)
values (1,
        TO_DATE('07/06/1987', 'DD/MM/YYYY'),
        'admin',
        'Maskim',
        100,
        'admin',
        'Nikolaevich',
        'Developer',
        'ROLE_ADMIN',
        TO_DATE('01/06/2020', 'DD/MM/YYYY'),
        'Tiunchik');

insert into employee (id, born, login, name, num, password, patronim, post, rights, start, surname)
values (2,
        TO_DATE('21/07/1994', 'DD/MM/YYYY'),
        'sokolova',
        'Marina',
        101,
        'sokolova',
        'Evgenevna',
        'Manager',
        'ROLE_USER',
        TO_DATE('01/06/2020', 'DD/MM/YYYY'),
        'Sokolova');

insert into holiday (id, finish, start, employee_id)
VALUES (1,
        TO_DATE('21/07/2020', 'DD/MM/YYYY'),
        TO_DATE('15/07/2020', 'DD/MM/YYYY'),
        1);

insert into holiday (id, finish, start, employee_id)
VALUES (2,
        TO_DATE('21/08/2020', 'DD/MM/YYYY'),
        TO_DATE('15/08/2020', 'DD/MM/YYYY'),
        1);

insert into holiday (id, finish, start, employee_id)
VALUES (3,
        TO_DATE('21/07/2020', 'DD/MM/YYYY'),
        TO_DATE('15/07/2020', 'DD/MM/YYYY'),
        2);

insert into holiday (id, finish, start, employee_id)
VALUES (4,
        TO_DATE('21/08/2020', 'DD/MM/YYYY'),
        TO_DATE('15/08/2020', 'DD/MM/YYYY'),
        2);
