package com.example.textAnalyzer_backend.service;

import org.SwaggerCodeGenExample.model.TextAnalyzerInput;
import org.SwaggerCodeGenExample.model.TextAnalyzerOutput;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TextAnalyzerService {
    char[] vowels = {'A', 'E', 'I', 'O', 'U'};

    /**
     * analyzes the given text concerning its vowels or consonants or both
     * @param input Object of Inputvariables
     * @return outputObject
     */
    public TextAnalyzerOutput analyzeText(TextAnalyzerInput input) {

        switch (input.getModus()) {
            case VOWELS:
                return analyzeVowels(input);
            case CONSONANTS:
                return analyzeConsonants(input);
            default:
                List<String> vowelsAndConsonantsMergedList = new ArrayList<>(analyzeVowels(input).getAnalyzedText());
                vowelsAndConsonantsMergedList.addAll(analyzeConsonants(input).getAnalyzedText());
                return generateOutput(input,vowelsAndConsonantsMergedList);
        }
    }

    /**
     * analyzes only the vowels in the given text
     * @param input Object of inputVariables
     * @return output Object
     */
    TextAnalyzerOutput analyzeVowels(TextAnalyzerInput input) {
        Map<Character, Integer> vowelMap = new HashMap<>();
        for (char vowel : vowels) {
            vowelMap.put(vowel, 0);
        }
        for (char c : input.getText().toCharArray()) {
            char uppercaseC =Character.toUpperCase(c);
            if (vowelMap.containsKey(uppercaseC)) {
                vowelMap.put(uppercaseC, vowelMap.get(uppercaseC) + 1);
            }
        }
        return generateOutput(input,convertMapToOutputList(vowelMap, input.getModus()));
    }
    /**
     * analyzes only the consonants in the given text
     * @param input Object of inputVariables
     * @return output Object
     */
    private TextAnalyzerOutput analyzeConsonants(TextAnalyzerInput input) {
        Map<Character, Integer> consonantsMap = new HashMap<>();
        for (char c : input.getText().toCharArray()) {
            char uppercaseC =Character.toUpperCase(c);
            if (isCharConsonant(uppercaseC)) {
                consonantsMap.put(uppercaseC, consonantsMap.getOrDefault(uppercaseC, 0) + 1);
            }
        }
        return generateOutput(input,convertMapToOutputList(consonantsMap, input.getModus()));
    }

    /**
     *generates the output Object from the analyzed texts
     * @param input Object
     * @param analyzedText already analysed Text
     * @return Output Object for REST
     */
    private TextAnalyzerOutput generateOutput(TextAnalyzerInput input, List<String> analyzedText) {
        TextAnalyzerOutput output = new TextAnalyzerOutput();
        output.setAnalyzedText(analyzedText);
        output.setOriginalText(input.getText());
        output.setTimestamp(getCurrentTimestampString());
        return output;
    }

    /**
     * converts the map, which includes the analyzed values into readable strings
     * @param map with analyzed values
     * @param modus describes the chosen analysation modus
     * @return List with Strings used for the Output Objekt
     */
    private List<String> convertMapToOutputList(Map<Character, Integer> map, TextAnalyzerInput.ModusEnum modus) {
        if (areMapValuesZero(map)) {
            return Collections.singletonList(
                    String.format("No %s were found to be analyzed.", modus.equals(TextAnalyzerInput.ModusEnum.VOWELS) ? "vowels" : "consonants")
            );
        }

        List<String> outputList = new ArrayList<>();
        map.forEach((key, value) -> outputList.add(String.format("Letter '%c' appears %d times", key, value)));
        return outputList;
    }

    /**
     * checks if the analysed values in the map are all zero
     * @param map if the analysed values
     * @return true if all values in the map are 0
     */
    private boolean areMapValuesZero(Map<Character, Integer> map) {
        boolean onlyZeros= true;
        for (Map.Entry<Character, Integer> entry : map.entrySet()) {
            if (entry.getValue() > 0) {
                onlyZeros = false;
                break;
            }
        }
        return onlyZeros;
    }

    /**
     * checks if the given character is a consonant
     * @param c character to be analyzed
     * @return true if the char is a consonant
     */
    private boolean isCharConsonant(char c) {
        if (!Character.isLetter(c)) {
            return false;
        }
        for (char vowel : vowels) {
            if (Character.toUpperCase(c) == vowel) {
                return false;
            }
        }
        return true;
    }

    /**
     * returns the current date and time in a readable format
     * @return dd.MM.yyyy HH:mm
     */
    private String getCurrentTimestampString() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
        return now.format(formatter);
    }


}
