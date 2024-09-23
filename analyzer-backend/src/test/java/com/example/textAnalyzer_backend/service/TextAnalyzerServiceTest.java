package com.example.textAnalyzer_backend.service;

import org.SwaggerCodeGenExample.model.TextAnalyzerInput;
import org.SwaggerCodeGenExample.model.TextAnalyzerOutput;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TextAnalyzerServiceTest {

    @Autowired
    private TextAnalyzerService textAnalyzerService;

        @Test
        void testAnalyzeVowels() {
        TextAnalyzerInput input = new TextAnalyzerInput();
        input.setText("aaaeeoo");
        input.setModus(TextAnalyzerInput.ModusEnum.VOWELS);

        TextAnalyzerOutput output = textAnalyzerService.analyzeText(input);
        List<String> analyzedText = output.getAnalyzedText();

        assertEquals("Letter 'A' appears 3 times", analyzedText.get(0));
        assertEquals("Letter 'E' appears 2 times", analyzedText.get(1));
        assertEquals("Letter 'U' appears 0 times", analyzedText.get(2));
        assertEquals("Letter 'I' appears 0 times", analyzedText.get(3));
        assertEquals("Letter 'O' appears 2 times", analyzedText.get(4));
        }

        @Test
        void testAnalyzeConsonants() {
            TextAnalyzerInput input = new TextAnalyzerInput();
            input.setText("Hello World");
            input.setModus(TextAnalyzerInput.ModusEnum.CONSONANTS);

            TextAnalyzerOutput output = textAnalyzerService.analyzeText(input);

            List<String> analyzedText = output.getAnalyzedText();
            assertEquals("Letter 'R' appears 1 times", analyzedText.get(0));
            assertEquals("Letter 'D' appears 1 times", analyzedText.get(1));
            assertEquals("Letter 'W' appears 1 times", analyzedText.get(2));
            assertEquals("Letter 'H' appears 1 times", analyzedText.get(3));
            assertEquals("Letter 'L' appears 3 times", analyzedText.get(4));
        }

    @Test
    void testAnalyzeConsonantsAndVowls() {
        TextAnalyzerInput input = new TextAnalyzerInput();
        input.setText("Hello");
        input.setModus(TextAnalyzerInput.ModusEnum.ALL);

        TextAnalyzerOutput output = textAnalyzerService.analyzeText(input);

        List<String> analyzedText = output.getAnalyzedText();
        assertEquals("Letter 'A' appears 0 times", analyzedText.get(0));
        assertEquals("Letter 'E' appears 1 times", analyzedText.get(1));
        assertEquals("Letter 'U' appears 0 times", analyzedText.get(2));
        assertEquals("Letter 'I' appears 0 times", analyzedText.get(3));
        assertEquals("Letter 'O' appears 1 times", analyzedText.get(4));
        assertEquals("Letter 'H' appears 1 times", analyzedText.get(5));
        assertEquals("Letter 'L' appears 2 times", analyzedText.get(6));
    }

        @Test
        void testAnalyzeTextNoVowels() {
            TextAnalyzerInput input = new TextAnalyzerInput();
            input.setText("Cwm");
            input.setModus(TextAnalyzerInput.ModusEnum.VOWELS);

            TextAnalyzerOutput output = textAnalyzerService.analyzeText(input);

            List<String> analyzedText = output.getAnalyzedText();
            assertEquals("No vowels were found to be analyzed.", analyzedText.get(0));
        }

        @Test
        void testAnalyzeTextNoConsonants() {
            TextAnalyzerInput input = new TextAnalyzerInput();
            input.setText("AEIOU");
            input.setModus(TextAnalyzerInput.ModusEnum.CONSONANTS);

            TextAnalyzerOutput output = textAnalyzerService.analyzeText(input);

            List<String> analyzedText = output.getAnalyzedText();
            assertEquals("No consonants were found to be analyzed.", analyzedText.get(0));
        }

    }
