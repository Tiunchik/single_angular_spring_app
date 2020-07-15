package org.drive.employee;

import org.drive.employee.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByLogin(String login);

    Employee findByLoginAndPassword(String login, String password);

}
