package org.drive.holiday;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HolidayService {

    private final HolidayRepository holRep;

    private final ModelMapper mapper;

    public HolidayService(@Autowired HolidayRepository holRep,
                          @Autowired ModelMapper mapper) {
        this.holRep = holRep;
        this.mapper = mapper;
    }

    public List<HolidayDTO> getAllHolidays(){
        return holRep.findAll().stream()
                .map(e -> mapper.map(e, HolidayDTO.class))
                .collect(Collectors.toList());
    }

    public HolidayDTO getHoliday(Long id) {
        Optional<Holiday> emp = holRep.findById(id);
        return emp
                .map(e -> mapper.map(e, HolidayDTO.class))
                .orElse(null);
    }

    public List<HolidayDTO> getHolidayByEmployeeId(Long id) {
        return holRep.findByEmployee_Id(id).stream()
                .map(e -> mapper.map(e, HolidayDTO.class))
                .collect(Collectors.toList());
    }

    public HolidayDTO saveOrUpdateHoliday(HolidayDTO hol){
        return mapper.map(holRep.save(mapper.map(hol, Holiday.class)), HolidayDTO.class);
    }

    public void deleteHoliday(Long id) {
        holRep.deleteById(id);
    }

}
