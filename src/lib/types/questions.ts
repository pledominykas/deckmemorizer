import type { Card, CardSuit, CardValue } from "$lib/types/cards";

export enum QuestionType {
  Positional = "Positional",
  ReversePositional = "ReversePositional",
  AdjacentBefore = "AdjacentBefore",
  AdjacentAfter = "AdjacentAfter",
  CutCalculation = "CutCalculation",
}

export interface BaseQuestion {
  kind: QuestionType;
  question: string;
}

export interface PositionalQuestion extends BaseQuestion {
  kind: QuestionType.Positional;
  questionPosition: number;
  answer: CardAnswer;
}

export interface ReversePositionalQuestion extends BaseQuestion {
  kind: QuestionType.ReversePositional;
  questionCard: Card;
  answer: PositionAnswer;
}

export interface AdjacentBeforeQuestion extends BaseQuestion {
  kind: QuestionType.AdjacentBefore;
  questionCard: Card;
  answer: CardAnswer;
}

export interface AdjacentAfterQuestion extends BaseQuestion {
  kind: QuestionType.AdjacentAfter;
  questionCard: Card;
  answer: CardAnswer;
}

export interface CutCalculationQuestion extends BaseQuestion {
  kind: QuestionType.CutCalculation;
  questionCard: Card;
  questionPosition: number;
  answer: CardAnswer;
}

export type Question =
  | PositionalQuestion
  | ReversePositionalQuestion
  | AdjacentBeforeQuestion
  | AdjacentAfterQuestion
  | CutCalculationQuestion;

export type Answer = CardAnswer | PositionAnswer;

export interface CardAnswer {
  kind: AnswerType.Card;
  value: AnswerCard;
}

export interface AnswerCard {
  suit: CardSuit;
  value: CardValue;
}

export interface PositionAnswer {
  kind: AnswerType.Position;
  value: number;
}

export enum AnswerType {
  Card = "Card",
  Position = "Position",
}
