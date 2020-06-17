package org.drive.repositories;

import org.drive.models.Holiday;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface HolidayRepository extends PagingAndSortingRepository<Holiday, Long> {
}
