package com.guisantosfr.readnext.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guisantosfr.readnext.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/is-in-library", "/books/is-in-library"})
@RequiredArgsConstructor
public class LibraryController {

    private final BookService bookService;

    @GetMapping("/{id}")
    public boolean isInLibrary(@PathVariable String id) {
        return bookService.isInLibrary(id);
    }
}
