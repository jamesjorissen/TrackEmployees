USE employeetracker;

INSERT INTO department
    (id, department_name)
VALUES
    (1, 'Schools');

INSERT INTO department
    (id, department_name)
VALUES
    (2, 'Ops');

INSERT INTO department
    (id, department_name)
VALUES
    (3, 'Academics');
INSERT INTO department
    (id, department_name)
VALUES
    (4, 'IT');

INSERT INTO department
    (id, department_name)
VALUES
    (5, 'Finance');


INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, 'Chief of Schools', 160000, 1);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (2, 'Director of Operations', 150000, 2);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (3, 'Chief Academics Officer', 175000, 3);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (4, 'Executive Director', 150000, 4);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (5, 'Chief Financial Officer', 200000, 5);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (6, 'Assistant Superintendent', 140000, 1);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (7, 'Finance Manager', 100000, 2);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (8, 'MLL Director', 120000, 3);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (9, 'Service Desk Technician', 60000, 4);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (10, 'Controller', 150000, 5);



INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Rich', 'Anderson', 1, null);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (2, 'Jeff', 'Johnson', 2, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (3, 'Barb', 'Schmidt', 3, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (4, 'Gary', 'Player', 4, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (5, 'Rodney', 'King', 5, 2);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (6, 'Ralph', 'Thor', 6, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (7, 'Janet', 'Colton', 7, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (8, 'Leanne', 'Black', 8, 4);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (9, 'Jerry', 'Cox', 9, 4);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (10, 'Pablo', 'Salazar', 10, 4);