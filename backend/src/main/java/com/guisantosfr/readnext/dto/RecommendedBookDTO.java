package com.guisantosfr.readnext.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RecommendedBookDTO(
        String title,
        String author,
        String summary,
        String genre,
        String reason) {
}
