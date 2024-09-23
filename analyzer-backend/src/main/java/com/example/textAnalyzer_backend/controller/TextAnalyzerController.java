package com.example.textAnalyzer_backend.controller;

import com.example.textAnalyzer_backend.service.TextAnalyzerService;
import org.SwaggerCodeGenExample.api.TextApi;
import org.SwaggerCodeGenExample.model.TextAnalyzerInput;
import org.SwaggerCodeGenExample.model.TextAnalyzerOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TextAnalyzerController implements TextApi {
    @Autowired
    TextAnalyzerService textAnalyzerService;

    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    public ResponseEntity<TextAnalyzerOutput> postTextAnalysis(TextAnalyzerInput textAnalyzerInput) {
        return ResponseEntity.ok(textAnalyzerService.analyzeText(textAnalyzerInput));
    }
}
