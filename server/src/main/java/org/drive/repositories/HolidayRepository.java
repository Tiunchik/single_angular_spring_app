package org.drive.repositories;

import org.drive.models.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {

    List<Holiday> findByEmployee_Id(Long id);

}
