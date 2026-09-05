package com.guisantosfr.readnext.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guisantosfr.readnext.dto.RecommendationRequestDTO;
import com.guisantosfr.readnext.dto.RecommendationResponseDTO;
import com.guisantosfr.readnext.service.RecommendationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/recommendations", "/api/recommendations", "/books/recommendations"})
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping
    public RecommendationResponseDTO getRecommendations(@Valid @RequestBody RecommendationRequestDTO request) {
        return recommendationService.generateRecommendations(request);
    }
}
