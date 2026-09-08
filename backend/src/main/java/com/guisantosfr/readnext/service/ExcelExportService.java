package com.guisantosfr.readnext.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guisantosfr.readnext.model.Book;
import com.guisantosfr.readnext.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final BookRepository bookRepository;

    @Transactional(readOnly = true)
    public byte[] exportRecommendationsToExcel() throws IOException {
        List<Book> recommendations = bookRepository.findByRecommendedFromNotNull();

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Recomendações");

            // Estilo do cabeçalho
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            // Linha de cabeçalho
            Row headerRow = sheet.createRow(0);
            Cell headerCell0 = headerRow.createCell(0);
            headerCell0.setCellValue("Livro Base");
            headerCell0.setCellStyle(headerStyle);

            Cell headerCell1 = headerRow.createCell(1);
            headerCell1.setCellValue("Recomendação");
            headerCell1.setCellStyle(headerStyle);

            // Preenchimento das linhas com os dados
            int rowIdx = 1;
            for (Book book : recommendations) {
                Row row = sheet.createRow(rowIdx++);
                String baseTitle = book.getRecommendedFrom() != null ? book.getRecommendedFrom().getTitle() : "";
                row.createCell(0).setCellValue(baseTitle);
                row.createCell(1).setCellValue(book.getTitle());
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);

            workbook.write(out);
            return out.toByteArray();
        }
    }
}
