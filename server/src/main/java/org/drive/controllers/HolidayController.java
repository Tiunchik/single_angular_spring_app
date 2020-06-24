package org.drive.controllers;

import org.drive.models.Holiday;
import org.drive.repositories.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class HolidayController {

    private final HolidayRepository holRep;

    public HolidayController(@Autowired HolidayRepository holRep) {
        this.holRep = holRep;
    }


    @GetMapping("/holiday")
    public ResponseEntity<List<Holiday>>  getAllHolidays(){
        return new ResponseEntity<>(holRep.findAll(), HttpStatus.OK);
    }

    @GetMapping("/holiday/{id}")
    public ResponseEntity<Holiday> getHoliday(@PathVariable Long id) {
        Optional<Holiday> emp = holRep.findById(id);
        return emp
                .map(e -> new ResponseEntity<>(e, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/holiday/employee/{id}")
    public ResponseEntity<List<Holiday>> getHolidayByEmployeeId(@PathVariable Long id) {
        return new ResponseEntity<>(holRep.findByEmployee_Id(id), HttpStatus.OK);
    }

    @PostMapping("/holiday")
    public ResponseEntity<Holiday> createHoliday(@RequestBody Holiday hol){
        if (hol.getId() != 0) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Holiday answer = holRep.save(hol);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }

    @PutMapping("/holiday")
    public ResponseEntity<Holiday> updateHoliday(@RequestBody Holiday hol){
        if (hol.getId() == 0) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Holiday answer = holRep.save(hol);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Long id) {
        holRep.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
