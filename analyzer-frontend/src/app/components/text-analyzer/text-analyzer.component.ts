import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAnalysisService } from '../../services/text-analyzer/text-analysis.service';
import { TextAnalyzerApiService } from '../../services/text-analyzer/text-analyzer-api.service';
import { TextAnalyzerInput, TextAnalyzerOutput } from '../../model/text-analyzer.model';

@Component({
  selector: 'app-text-analyzer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './text-analyzer.component.html',
  styleUrl: './text-analyzer.component.css'
})


export class TextAnalyzerComponent {

  textAnalysisService = inject(TextAnalysisService); //Service for offline analysis
  textAnalysisApiService = inject(TextAnalyzerApiService);

  results : TextAnalyzerOutput [] = []; //to store more than one analysis
  inputText: string = '';
  analysedText: string[] = []; //to be filled by REST Call or Service Class
  online : boolean = false;
  modus : string = '';

  input: TextAnalyzerInput = { modus: 'ALL', text: ''};
  output: TextAnalyzerOutput | null = null;

  clearResults() {
    this.results= [];
  }

  analyzeText() {
    if (this.online) {
      this.textAnalysisApiService
      .postTextAnalysis(this.input)
      .subscribe({
        next: (response) => {
          this.output = response;
          this.results.push(this.output);
          this.inputText = '';
        },
        error: (error) =>{
            console.error('Error occurred:', error);
            alert('Das Backend ist derzeit nicht erreichbar. Wir lösen das Beispiel offline');
            this.results.push(this.textAnalysisService.analyzeText(this.input));
            this.inputText = '';
            this.online =false;
          }
        });
        
    } else {
      this.results.push(this.textAnalysisService.analyzeText(this.input)); 
      this.inputText = '';
    }
    }
}
