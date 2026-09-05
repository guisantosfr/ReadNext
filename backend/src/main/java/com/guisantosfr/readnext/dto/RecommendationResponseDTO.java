package com.guisantosfr.readnext.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RecommendationResponseDTO(
        List<RecommendedBookDTO> recommendations) {
}
