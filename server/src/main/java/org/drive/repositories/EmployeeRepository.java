package org.drive.repositories;

import org.drive.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByLogin(String login);

    Employee findByLoginAndPassword(String login, String password);

}
