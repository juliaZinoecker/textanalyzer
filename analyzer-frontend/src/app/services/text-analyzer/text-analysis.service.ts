import { Injectable } from '@angular/core';
import { TextAnalyzerInput, TextAnalyzerOutput } from '../../model/text-analyzer.model';

@Injectable({
  providedIn: 'root'
})
export class TextAnalysisService {
  vowels: string[] = ['A', 'E', 'I', 'O', 'U'];

  constructor() {   }

  public analyzeText(input: TextAnalyzerInput): TextAnalyzerOutput {
    if (input.modus === "VOWELS") {
      return this.analyzeVowels(input);
    }
    else if (input.modus === "CONSONANTS") {
      return this.analyzeConsonants(input);
    }
    else {
      const vowelsAndConsonantsMergedList: string[] = [
        ...this.analyzeVowels(input).analyzedText,
        ...this.analyzeConsonants(input).analyzedText];
      return this.generateOutput(input, vowelsAndConsonantsMergedList);
    }
}

private analyzeVowels(input: TextAnalyzerInput): TextAnalyzerOutput {
  const vowelMap: Map<string, number> = new Map();

  for (const vowel of this.vowels) {
      vowelMap.set(vowel.toUpperCase(), 0);
  }

  for (const c of input.text) {
      const uppercaseC = c.toUpperCase();
      if (vowelMap.has(uppercaseC)) {
          vowelMap.set(uppercaseC, vowelMap.get(uppercaseC)! + 1);
      }
  }

  return this.generateOutput(input, this.convertMapToOutputList(vowelMap, input));
}


private analyzeConsonants(input: TextAnalyzerInput): TextAnalyzerOutput {
  const consonantsMap: Map<string, number> = new Map();

  for (const c of input.text) {
      const uppercaseC = c.toUpperCase();
      if (this.isCharConsonant(uppercaseC)) {
          consonantsMap.set(uppercaseC, (consonantsMap.get(uppercaseC) || 0) + 1);
      }
  }

  return this.generateOutput(input, this.convertMapToOutputList(consonantsMap, input));
}

private generateOutput(input: TextAnalyzerInput, analyzedText: string[]): TextAnalyzerOutput {
  const output: TextAnalyzerOutput = {
      analyzedText: analyzedText,
      originalText: input.text,
      timestamp: this.getCurrentTimestampString()
  };
  return output;
}

private convertMapToOutputList(map: Map<string, number>, input: TextAnalyzerInput): string[] {
  if (this.areMapValuesZero(map)) {
      return [
          `No ${input.modus === "VOWELS" ? "vowels" : "consonants"} were found to be analyzed.`
      ];
  }
  const outputList: string[] = [];
  map.forEach((value, key) => {
      outputList.push(`Letter '${key}' appears ${value} times`);
  });

  return outputList;
}


private areMapValuesZero(vowelMap: Map<string, number>): boolean {
  let noVowels = true;

  for (const value of vowelMap.values()) {
      if (value > 0) {
          noVowels = false;
          break;
      }
  }

  return noVowels;
}

private isCharConsonant(c: string): boolean {
  if (!/^[A-Za-z]$/.test(c)) {
      return false;
  }

  for (const vowel of this.vowels) {
      if (c.toUpperCase() === vowel) {
          return false;
      }
  }

  return true;
}

private getCurrentTimestampString(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
  };
  return now.toLocaleString('de-DE', options).replace(',', '');
}

}

