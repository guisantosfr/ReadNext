package com.guisantosfr.readnext.dto;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GoogleBooksResponseDTO(
        String kind,
        Integer totalItems,
        List<GoogleBookItemDTO> items) {

    public GoogleBooksResponseDTO {
        if (items == null) {
            items = Collections.emptyList();
        }
        if (totalItems == null) {
            totalItems = items.size();
        }
    }
}
