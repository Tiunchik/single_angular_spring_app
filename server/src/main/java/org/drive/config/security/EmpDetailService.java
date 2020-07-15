package org.drive.config.security;

import org.drive.employee.Employee;
import org.drive.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class EmpDetailService implements UserDetailsService {

    @Autowired
    private EmployeeRepository empRep;

    @Override
    public EmpDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Employee emp = empRep.findByLogin(login);
        return EmpDetails.createsiteDetails(emp);
    }

}
