package org.drive.controllers;

import org.drive.models.Employee;
import org.drive.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/employee")
public class EmployeeController {

    private EmployeeRepository empRep;

    public EmployeeController(EmployeeRepository empRep) {
        this.empRep = empRep;
    }

    @GetMapping
    public List<Employee> getAllEmployees(){
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return null;
    }

    @PutMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee emp){
        return null;
    }

    @PostMapping()
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee emp){
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        return null;
    }
}
