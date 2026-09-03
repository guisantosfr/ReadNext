package com.guisantosfr.readnext.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

import com.guisantosfr.readnext.model.BookStatus;

public record BookResponseDTO(
                UUID id,
                String title,
                String author,
                String description,
                String cover,
                String genre,
                Integer pages,
                BookStatus status,
                UUID recommendedFrom,
                OffsetDateTime createdAt,
                OffsetDateTime updatedAt) {
}
