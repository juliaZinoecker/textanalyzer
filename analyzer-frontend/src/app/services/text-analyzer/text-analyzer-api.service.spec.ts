import { TestBed } from '@angular/core/testing';
import { TextAnalyzerApiService } from './text-analyzer-api.service';
import { provideHttpClient } from '@angular/common/http';


describe('TextAnalyzerApiService', () => {
  let service: TextAnalyzerApiService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        TextAnalyzerApiService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(TextAnalyzerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
