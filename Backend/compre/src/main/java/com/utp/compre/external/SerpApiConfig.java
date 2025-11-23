package com.utp.compre.external;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class SerpApiConfig {

    @Value("${serpapi.key}")
    private String apiKey;

    @Bean
    public WebClient serpApiClient() {
        return WebClient.builder()
                .baseUrl("https://serpapi.com/search")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String getApiKey() {
        return apiKey;
    }
}
