package org.drive.security;

import org.drive.models.Employee;
import org.drive.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

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
