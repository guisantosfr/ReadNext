package com.guisantosfr.readnext.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record VolumeInfoDTO(
        String title,
        String subtitle,
        List<String> authors,
        String publisher,
        String publishedDate,
        String description,
        Integer pageCount,
        List<String> categories,
        Double averageRating,
        Integer ratingsCount,
        ImageLinksDTO imageLinks,
        String language,
        String previewLink,
        String infoLink) {
}
