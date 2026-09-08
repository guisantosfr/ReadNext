package com.guisantosfr.readnext.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.guisantosfr.readnext.dto.GoogleBooksResponseDTO;

@Component
public class GoogleBooksClient {

    private final RestClient restClient;
    private final String googleBooksUrl;
    private final String apiKey;

    public GoogleBooksClient(
            @Value("${google.books.url:https://www.googleapis.com/books/v1/volumes}") String googleBooksUrl,
            @Value("${google.books.api-key:}") String apiKey) {
        this.restClient = RestClient.create();
        this.googleBooksUrl = googleBooksUrl;
        this.apiKey = apiKey;
    }

    public GoogleBooksResponseDTO searchBooks(String query) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(googleBooksUrl)
                .queryParam("q", query)
                .queryParam("maxResults", 40)
                .queryParam("printType", "books");

        if (apiKey != null && !apiKey.isBlank()) {
            uriBuilder.queryParam("key", apiKey);
        }

        String uri = uriBuilder.build(false).toUriString();

        return restClient.get()
                .uri(uri)
                .retrieve()
                .body(GoogleBooksResponseDTO.class);
    }
}
