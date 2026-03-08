import type { Question, QuestionType } from "./questions";

export interface PracticeSettings {
  selectedQuestionTypes: QuestionType[];
  numberOfQuestions: number;
}

export interface PracticeState {
  answeredQuestionCount: number;
  correctAnswerCount: number;
  currentStreak: number;
  currentQuestion: Question;
}
