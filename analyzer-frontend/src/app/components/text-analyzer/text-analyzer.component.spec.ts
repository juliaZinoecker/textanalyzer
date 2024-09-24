import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzerComponent } from './text-analyzer.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TextAnalyzerComponent', () => {
  let component: TextAnalyzerComponent;
  let fixture: ComponentFixture<TextAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAnalyzerComponent],
      providers: [
        provideHttpClient(),               
        provideHttpClientTesting,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
