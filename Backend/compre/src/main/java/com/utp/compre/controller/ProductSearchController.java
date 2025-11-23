package com.utp.compre.controller;

import com.utp.compre.model.ProductSearchResult;
import com.utp.compre.service.ProductSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@CrossOrigin("*")
public class ProductSearchController {

    private final ProductSearchService service;

    @GetMapping
    public Mono<List<ProductSearchResult>> search(@RequestParam String query) {
        return service.searchProducts(query);
    }
}
