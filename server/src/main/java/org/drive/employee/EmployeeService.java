package org.drive.employee;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository empRep;

    private final ModelMapper mapper;

    public EmployeeService(@Autowired EmployeeRepository empRep,
                           @Autowired ModelMapper mapper) {
        this.empRep = empRep;
        this.mapper = mapper;
    }

    public List<EmployeeDTO> getAllEmployees() {
        return empRep.findAll()
                .stream()
                .map(e -> mapper.map(e, EmployeeDTO.class))
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployee(Long id) {
        Optional<Employee> emp = empRep.findById(id);
        return emp.map(e -> mapper.map(e, EmployeeDTO.class))
                .orElse(null);
    }

    public EmployeeDTO saveOrUpdateEmployee(EmployeeDTO emp) {
        Employee answer = empRep.save(mapper.map(emp, Employee.class));
        return mapper.map(answer, EmployeeDTO.class);
    }

    public void deleteEmployee(Long id) {
        empRep.deleteById(id);
    }
}
