import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TextAnalyzerOutput } from '../../model/text-analyzer.model';
import { TextAnalyzerInput } from '../../model/text-analyzer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextAnalyzerApiService {

  private apiUrl :string = 'http://localhost:8080/text/analysis';

  constructor(private http:HttpClient) { }

  postTextAnalysis(input: TextAnalyzerInput):Observable<TextAnalyzerOutput> {
    return this.http.post<TextAnalyzerOutput>(this.apiUrl,input);
  }
}
