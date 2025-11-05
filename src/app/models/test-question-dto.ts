export interface TestQuestionDTO {
  id: number;
  questionText: string;
  options: string[];
  questionType?: string;
  weight?: number;
  source?: string;
  correctAnswer?: string;
  isInternal?: boolean;
  difficulty?: string;

  // 🔹 Ajout de category
  category?: string;
}
