package com.guisantosfr.readnext.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guisantosfr.readnext.dto.GoogleBooksResponseDTO;
import com.guisantosfr.readnext.service.GoogleBooksService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/api/books/external", "/external-books", "/books/external"})
@RequiredArgsConstructor
public class GoogleBooksController {

    private final GoogleBooksService googleBooksService;

    @GetMapping("/search")
    public GoogleBooksResponseDTO searchByTitle(@RequestParam("q") String query) {
        return googleBooksService.searchByTitle(query);
    }

    @GetMapping("/author")
    public GoogleBooksResponseDTO searchByAuthor(@RequestParam("name") String name) {
        return googleBooksService.searchByAuthor(name);
    }
}
