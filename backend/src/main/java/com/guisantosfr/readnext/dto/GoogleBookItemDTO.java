package com.guisantosfr.readnext.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GoogleBookItemDTO(
        String id,
        String selfLink,
        VolumeInfoDTO volumeInfo) {
}
