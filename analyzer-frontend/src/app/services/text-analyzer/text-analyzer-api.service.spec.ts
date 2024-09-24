import { TestBed } from '@angular/core/testing';
import { TextAnalyzerApiService } from './text-analyzer-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('TextAnalyzerApiService', () => {
  let service: TextAnalyzerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TextAnalyzerApiService,
        provideHttpClient(),
        provideHttpClientTesting
      ]
    });
    service = TestBed.inject(TextAnalyzerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
