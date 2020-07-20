package org.drive.excel;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.drive.holiday.Holiday;
import org.drive.holiday.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Period;
import java.util.List;

@Service
@Scope("singleton")
public class ExcelService {

    private final static String[] HEADERs = {"NUMBER", "NAME", "PATRONIMYC",
            "SURNAME", "HOLIDAY START", "HOLIDAY FINISH", "TOTAL"};
    private final static String SHEETNAME = "HOLIDAY LIST";
    private final HolidayRepository holRep;

    public ExcelService(@Autowired HolidayRepository holRep) {
        this.holRep = holRep;
    }

    public ByteArrayInputStream load() {
        List<Holiday> holid = holRep.findAll();
        ByteArrayInputStream input = holidaysToExcel(holid);
        return input;
    }

    private ByteArrayInputStream holidaysToExcel(List<Holiday> list) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEETNAME);
            CreationHelper createHelper = workbook.getCreationHelper();
            CellStyle cellStyle = workbook.createCellStyle();
            cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy/mm/dd"));

            Row headerRow = sheet.createRow(0);
            int length = HEADERs.length;
            for (int col = 0; col < length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (var holiday : list) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(holiday.getEmployee().getNum());
                row.createCell(1).setCellValue(holiday.getEmployee().getName());
                row.createCell(2).setCellValue(holiday.getEmployee().getPatronim());
                row.createCell(3).setCellValue(holiday.getEmployee().getSurname());
                Cell cell = row.createCell(4);
                cell.setCellValue(holiday.getStart().toLocalDate());
                cell.setCellStyle(cellStyle);
                cell = row.createCell(5);
                cell.setCellValue(holiday.getFinish().toLocalDate());
                cell.setCellStyle(cellStyle);
                Period period = Period.between(holiday.getStart().toLocalDate(),
                        holiday.getFinish().toLocalDate());
                int difference = period.getDays();
                row.createCell(6).setCellValue(difference);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

}
