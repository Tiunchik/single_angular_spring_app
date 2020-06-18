package org.drive.controllers;

import org.drive.models.Employee;
import org.drive.repositories.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/holiday")
public class HolidayController {

    private HolidayRepository holRep;

    public HolidayController(HolidayRepository holRep) {
        this.holRep = holRep;
    }


    @GetMapping
    public List<Employee> getAllHolidays(){
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getHoliday(@PathVariable Long id) {
        return null;
    }

    @PutMapping
    public ResponseEntity<Employee> createHoliday(@RequestBody Employee emp){
        return null;
    }

    @PostMapping
    public ResponseEntity<Employee> updateHoliday(@RequestBody Employee emp){
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Long id) {
        return null;
    }
}
