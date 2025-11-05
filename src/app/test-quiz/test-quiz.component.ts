import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestQuizService, TestQuestionDTO, TestAnswerDTO, TestResult } from '../services/test-quiz.service';

@Component({
  selector: 'app-test-quiz',
  standalone: true, // ✅ obligatoire si pas d'app.module.ts
  imports: [CommonModule, FormsModule], // ✅ ajoute ici les directives de base
  templateUrl: './test-quiz.component.html',
  styleUrls: ['./test-quiz.component.css']
})
export class TestQuizComponent implements OnInit {
  questions: TestQuestionDTO[] = [];
  answers: TestAnswerDTO[] = [];
  result?: TestResult;
  username: string = 'Henda';
  isLoading = false;

  constructor(private quizService: TestQuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.isLoading = true;
    this.quizService.generateTest(this.username).subscribe({
      next: (data) => {
        this.questions = data;
        console.log('Questions chargées :', this.questions);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des questions :', err);
      },
      complete: () => (this.isLoading = false)
    });
  }

  toggleAnswer(questionId: number, optionId: number): void {
    let existing = this.answers.find(a => a.questionId === questionId);
    if (existing) {
      const index = existing.selectedAnswers.indexOf(optionId);
      if (index > -1) existing.selectedAnswers.splice(index, 1);
      else existing.selectedAnswers.push(optionId);
    } else {
      this.answers.push({ questionId, selectedAnswers: [optionId] });
    }
  }

  submitQuiz(): void {
    this.quizService.submitTest(this.username, this.answers).subscribe({
      next: (res) => {
        this.result = res;
        console.log('Résultat du test :', this.result);
      },
      error: (err) => console.error('Erreur lors de la soumission du quiz :', err)
    });
  }
}
