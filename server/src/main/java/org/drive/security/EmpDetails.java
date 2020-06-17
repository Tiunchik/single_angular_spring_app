package org.drive.security;

import org.drive.models.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class EmpDetails implements UserDetails {

    private String siteName;

    private String login;

    private String password;

    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public static EmpDetails createsiteDetails(Employee employee) {
        EmpDetails details = new EmpDetails();
        details.siteName = employee.getName() + employee.getSurname();
        details.login = employee.getLogin();
        details.password = employee.getPassword();
        details.grantedAuthorities = new ArrayList<>(List.of((GrantedAuthority) employee::getRights));
        return details;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
