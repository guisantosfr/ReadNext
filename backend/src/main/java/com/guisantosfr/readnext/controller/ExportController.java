package com.guisantosfr.readnext.controller;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guisantosfr.readnext.service.ExcelExportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/export", "/api/export", "/books/export"})
@RequiredArgsConstructor
public class ExportController {

    private final ExcelExportService excelExportService;

    @GetMapping("/excel")
    public ResponseEntity<byte[]> exportToExcel() throws IOException {
        byte[] excelContent = excelExportService.exportRecommendationsToExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=recomendacoes.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelContent);
    }
}
