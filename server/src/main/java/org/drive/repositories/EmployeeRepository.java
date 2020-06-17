package org.drive.repositories;

import org.drive.models.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

    Employee findByLogin(String login);

    Employee findByLoginAndPassword(String login, String password);

}
