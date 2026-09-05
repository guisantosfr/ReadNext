package com.guisantosfr.readnext.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.guisantosfr.readnext.dto.RecommendationRequestDTO;
import com.guisantosfr.readnext.dto.RecommendationResponseDTO;

@Service
public class RecommendationService {

    private final ChatClient chatClient;

    public RecommendationService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public RecommendationResponseDTO generateRecommendations(RecommendationRequestDTO request) {
        String userPrompt = """
                Atue como um recomendador de livros.
                Com base no seguinte livro fornecido pelo usuário:
                - Título: %s
                - Autor: %s
                - Resumo: %s

                Gere uma lista de recomendações de livros semelhantes que o leitor possa gostar.
                Para cada recomendação, forneça o título (title), autor (author), um breve resumo (summary), gênero (genre) e o motivo da recomendação (reason).
                """
                .formatted(request.title(), request.author(), request.summary());

        return chatClient.prompt()
                .user(userPrompt)
                .call()
                .entity(RecommendationResponseDTO.class);
    }
}
