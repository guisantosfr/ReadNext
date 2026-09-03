package com.guisantosfr.readnext.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guisantosfr.readnext.dto.BookRequestDTO;
import com.guisantosfr.readnext.dto.BookResponseDTO;
import com.guisantosfr.readnext.model.BookStatus;
import com.guisantosfr.readnext.service.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping
    public BookResponseDTO createBook(@Valid @RequestBody BookRequestDTO request) {
        return bookService.create(request);
    }

    @GetMapping
    public List<BookResponseDTO> findAll(
            @RequestParam(required = false) BookStatus status) {
        if (status != null) {
            return bookService.findByStatus(status);
        }

        return bookService.findAll();
    }

    @GetMapping("/{id}")
    public BookResponseDTO findById(@PathVariable UUID id) {
        return bookService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable UUID id) {
        bookService.delete(id);
    }

    @PatchMapping("/{id}/status")
    public BookResponseDTO updateStatus(@PathVariable UUID id, @RequestParam BookStatus status) {
        return bookService.updateStatus(id, status);
    }
}