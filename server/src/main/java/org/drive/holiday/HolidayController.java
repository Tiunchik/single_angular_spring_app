package org.drive.holiday;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HolidayController {

    private final HolidayService holService;

    public HolidayController(@Autowired HolidayService holService) {
        this.holService = holService;
    }


    @GetMapping("/holiday")
    public ResponseEntity<List<HolidayDTO>>  getAllHolidays(){
        return new ResponseEntity<>(holService.getAllHolidays(), HttpStatus.OK);
    }

    @GetMapping("/holiday/{id}")
    public ResponseEntity<HolidayDTO> getHoliday(@PathVariable Long id) {
        HolidayDTO emp = holService.getHoliday(id);
        if (emp != null) {
            return new ResponseEntity<>(emp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/holiday/employee/{id}")
    public ResponseEntity<List<HolidayDTO>> getHolidayByEmployeeId(@PathVariable Long id) {
        return new ResponseEntity<>(holService.getHolidayByEmployeeId(id), HttpStatus.OK);
    }

    @PostMapping("/holiday")
    public ResponseEntity<HolidayDTO> createHoliday(@RequestBody HolidayDTO hol){
        if (hol.getId() != 0) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        HolidayDTO answer = holService.saveOrUpdateHoliday(hol);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }

    @PutMapping("/holiday")
    public ResponseEntity<HolidayDTO> updateHoliday(@RequestBody HolidayDTO hol){
        if (hol.getId() == 0) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        HolidayDTO answer = holService.saveOrUpdateHoliday(hol);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Long id) {
        holService.deleteHoliday(id);
        return ResponseEntity.noContent().build();
    }
}
