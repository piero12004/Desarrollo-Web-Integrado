package com.utp.compre.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.utp.compre.external.SerpApiConfig;
import com.utp.compre.model.ProductSearchResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSearchService {

    private final WebClient serpApiClient;
    private final SerpApiConfig serpApiConfig;

    public Mono<List<ProductSearchResult>> searchProducts(String query) {

        return serpApiClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("engine", "google_shopping")
                        .queryParam("q", query)
                        .queryParam("api_key", serpApiConfig.getApiKey())
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(json -> {

                    List<ProductSearchResult> results = new ArrayList<>();
                    JsonNode items = json.get("shopping_results");

                    if (items != null) {
                        items.forEach(item -> {
                            ProductSearchResult p = new ProductSearchResult();
                            p.setTitle(item.get("title").asText());
                            p.setPrice(item.get("price").asText());
                            p.setThumbnail(item.get("thumbnail").asText());
                            p.setSource(item.get("source").asText());
                            results.add(p);
                        });
                    }

                    return results;
                });
    }
}
