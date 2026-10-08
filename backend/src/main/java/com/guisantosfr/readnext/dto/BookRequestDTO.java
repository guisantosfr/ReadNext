package com.guisantosfr.readnext.dto;

import java.util.UUID;

import com.guisantosfr.readnext.model.BookStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record BookRequestDTO(
                @NotBlank(message = "O título é obrigatório.") String title,

                @NotBlank(message = "O autor é obrigatório.") String author,

                String description,

                String cover,

                String genre,

                @PositiveOrZero(message = "O número de páginas deve ser maior ou igual a zero.") Integer pages,

                BookStatus status,

                UUID recommendedFromId) {
}
