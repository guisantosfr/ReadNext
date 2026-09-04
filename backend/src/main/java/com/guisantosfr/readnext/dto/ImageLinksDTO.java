package com.guisantosfr.readnext.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ImageLinksDTO(
        String smallThumbnail,
        String thumbnail) {
}
