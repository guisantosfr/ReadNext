package com.guisantosfr.readnext.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;

public record RecommendationRequestDTO(
        @NotBlank(message = "O título do livro é obrigatório")
        @JsonAlias({"nome", "title"})
        String title,

        @NotBlank(message = "O autor do livro é obrigatório")
        @JsonAlias({"autor", "author"})
        String author,

        @NotBlank(message = "O resumo do livro é obrigatório")
        @JsonAlias({"resumo", "summary", "description"})
        String summary) {
}
