import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestResult } from '../services/test-quiz.service';

@Component({
  selector: 'app-test-quiz-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-quiz-result.component.html',
  styleUrls: ['./test-quiz-result.component.css']
})
export class TestQuizResultComponent implements OnInit {

  result: TestResult | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('lastTestResult');
    if (stored) {
      this.result = JSON.parse(stored);
    } else {
      console.error('❌ Aucun résultat trouvé.');
      this.router.navigate(['/test-quiz']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
