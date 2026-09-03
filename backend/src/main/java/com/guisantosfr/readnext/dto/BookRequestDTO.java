package com.guisantosfr.readnext.dto;

import java.util.UUID;

import com.guisantosfr.readnext.model.BookStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record BookRequestDTO(
                @NotBlank(message = "O título é obrigatório.") String title,

                @NotBlank(message = "O autor é obrigatório.") String author,

                String description,

                String cover,

                String genre,

                @Positive(message = "O número de páginas deve ser maior que zero.") Integer pages,

                @NotNull(message = "O status é obrigatório.") BookStatus status,

                UUID recommendedFromId) {
}
