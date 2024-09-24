import { TestBed } from '@angular/core/testing';

import { TextAnalysisService } from './text-analysis.service';
import { TextAnalyzerInput, TextAnalyzerOutput } from '../../model/text-analyzer.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TextAnalysisService', () => {
  let service: TextAnalysisService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),               // HTTP Client für die Bereitstellung
        provideHttpClientTesting    // HTTP Testing Controller für Testzwecke
      ]
    }).compileComponents();

    service = TestBed.inject(TextAnalysisService);  // Service injizieren
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('analyzeText', () => {
    it('should analyze vowels correctly', () => {
      const input: TextAnalyzerInput = { text: 'aaaaaee', modus: 'VOWELS' };
      const output: TextAnalyzerOutput = service.analyzeText(input);

      expect(output.analyzedText).toEqual([
        "Letter 'A' appears 5 times",
        "Letter 'E' appears 2 times",
        "Letter 'I' appears 0 times",
        "Letter 'O' appears 0 times",
        "Letter 'U' appears 0 times"
      ]);
    });

    it('should analyze consonants correctly', () => {
      const input: TextAnalyzerInput = { text: 'Hello World', modus: 'CONSONANTS' };
      const output: TextAnalyzerOutput = service.analyzeText(input);

      expect(output.analyzedText).toEqual([
        "Letter 'H' appears 1 times",
        "Letter 'L' appears 3 times",
        "Letter 'W' appears 1 times",
        "Letter 'R' appears 1 times",
        "Letter 'D' appears 1 times"
      ]);
    });

    it('should analyze both vowels and consonants correctly', () => {
      const input: TextAnalyzerInput = { text: 'Hello World', modus: 'DEFAULT' };
      const output: TextAnalyzerOutput = service.analyzeText(input);

      expect(output.analyzedText).toContain("Letter 'E' appears 1 times");
      expect(output.analyzedText).toContain("Letter 'O' appears 2 times");
      expect(output.analyzedText).toContain("Letter 'H' appears 1 times");
      expect(output.analyzedText).toContain("Letter 'L' appears 3 times");
    });

    it('should return message if no vowels found', () => {
      const input: TextAnalyzerInput = { text: 'Cwm', modus: 'VOWELS' };
      const output: TextAnalyzerOutput = service.analyzeText(input);

      expect(output.analyzedText).toEqual([
        "No vowels were found to be analyzed."
      ]);
    });

    it('should return message if no consonants found', () => {
      const input: TextAnalyzerInput = { text: 'AEIOU', modus: 'CONSONANTS' };
      const output: TextAnalyzerOutput = service.analyzeText(input);

      expect(output.analyzedText).toEqual([
        "No consonants were found to be analyzed."
      ]);
    });
  });
});
