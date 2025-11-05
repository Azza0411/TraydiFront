import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TestOption {
  id: number;
  text: string;
}

export interface TestQuestionDTO {
  id: number;
  questionText: string;
  options: TestOption[]; // ✅ chaque question a des options avec id + texte
  questionType?: string;
  weight?: number;
  source?: string;
  correctAnswer?: string;
  isInternal?: boolean;
  difficulty?: string;
  category?: string;
}

export interface TestAnswerDTO {
  questionId: number;
  selectedAnswers: number[]; // ✅ on sélectionne les IDs des options
}

export interface TestResult {
  id: number;
  dateTest: string;
  techScore: number;
  psyScore: number;
  expScore: number;
  tsi: number;
  niveau: string;
  badge: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestQuizService {

  private apiUrl = 'http://localhost:8081/api/quiz';

  constructor(private http: HttpClient) {}

  generateTest(username: string): Observable<TestQuestionDTO[]> {
    return this.http.get<TestQuestionDTO[]>(`${this.apiUrl}/generate/${username}`);
  }

  submitTest(username: string, answers: TestAnswerDTO[]): Observable<TestResult> {
    return this.http.post<TestResult>(`${this.apiUrl}/submit/${username}`, answers);
  }

  getLastTest(username: string): Observable<TestResult> {
    return this.http.get<TestResult>(`${this.apiUrl}/last/${username}`);
  }
}
