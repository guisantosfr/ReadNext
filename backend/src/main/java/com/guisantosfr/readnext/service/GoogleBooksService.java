package com.guisantosfr.readnext.service;

import java.util.Collections;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.guisantosfr.readnext.client.GoogleBooksClient;
import com.guisantosfr.readnext.dto.GoogleBooksResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleBooksService {

    private final GoogleBooksClient googleBooksClient;

    @Cacheable(value = "booksByTitle", key = "#query")
    public GoogleBooksResponseDTO searchByTitle(String query) {
        if (query == null || query.isBlank()) {
            return new GoogleBooksResponseDTO(null, 0, Collections.emptyList());
        }

        String formattedQuery = query.toLowerCase().startsWith("intitle:") ? query : "intitle:" + query.trim();
        return googleBooksClient.searchBooks(formattedQuery);
    }

    @Cacheable(value = "booksByAuthor", key = "#authorName")
    public GoogleBooksResponseDTO searchByAuthor(String authorName) {
        if (authorName == null || authorName.isBlank()) {
            return new GoogleBooksResponseDTO(null, 0, Collections.emptyList());
        }

        String formattedQuery = authorName.toLowerCase().startsWith("inauthor:") ? authorName : "inauthor:" + authorName.trim();
        return googleBooksClient.searchBooks(formattedQuery);
    }
}
