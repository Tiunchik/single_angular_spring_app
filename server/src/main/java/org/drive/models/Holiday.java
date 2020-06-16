package org.drive.models;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne
    @JoinColumn(name = "employee_id",
            foreignKey = @ForeignKey(name = "EMPLOYEE_ID_FK")
    )
    private Employee employee;

    private Date start;

    private Date finish;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getFinish() {
        return finish;
    }

    public void setFinish(Date finish) {
        this.finish = finish;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Holiday holiday = (Holiday) o;
        return id == holiday.id
                && employee.equals(holiday.employee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, employee);
    }
}
