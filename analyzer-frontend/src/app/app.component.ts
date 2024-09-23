import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextAnalyzerComponent } from './components/text-analyzer/text-analyzer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextAnalyzerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'textAnalyzerApp';
}
