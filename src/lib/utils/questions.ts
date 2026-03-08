import { VALUE_DISPLAY_NAMES, type Deck } from "$lib/types/cards";
import type { PracticeSettings } from "$lib/types/practice";
import {
  AnswerType,
  type PositionalQuestion,
  type Question,
  QuestionType,
} from "$lib/types/questions";

export function generateRandomQuestion(
  deck: Deck,
  settings: PracticeSettings,
): Question {
  const randomType =
    settings.selectedQuestionTypes[
      Math.floor(Math.random() * settings.selectedQuestionTypes.length)
    ];

  switch (randomType) {
    case QuestionType.Positional:
      return generateRandomPositionalQuestion(deck);
    case QuestionType.ReversePositional:
      return generateRandomReversePositionalQuestion(deck);
    case QuestionType.AdjacentBefore:
      return generateRandomAdjacentBeforeQuestion(deck);
    case QuestionType.AdjacentAfter:
      return generateRandomAdjacentAfterQuestion(deck);
    case QuestionType.CutCalculation:
      return generateRandomCutCalculationQuestion(deck);
    default:
      throw new Error(`Unsupported question type: ${randomType}`);
  }
}

export function generateRandomPositionalQuestion(
  deck: Deck,
): PositionalQuestion {
  const randomIndex = Math.floor(Math.random() * deck.cards.length);
  const card = deck.cards[randomIndex];

  return {
    kind: QuestionType.Positional,
    question: `What card is at position ${card.position}?`,
    questionPosition: card.position,
    answer: {
      kind: AnswerType.Card,
      value: card,
    },
  };
}

export function generateRandomReversePositionalQuestion(deck: Deck): Question {
  const randomIndex = Math.floor(Math.random() * deck.cards.length);
  const card = deck.cards[randomIndex];

  return {
    kind: QuestionType.ReversePositional,
    question: `What position is the ${VALUE_DISPLAY_NAMES[card.value]} of ${card.suit} at?`,
    questionCard: card,
    answer: {
      kind: AnswerType.Position,
      value: card.position,
    },
  };
}

export function generateRandomAdjacentBeforeQuestion(deck: Deck): Question {
  // Ensure we don't pick the first card
  const randomIndex = Math.floor(Math.random() * (deck.cards.length - 1)) + 1;
  const card = deck.cards[randomIndex];
  const adjacentCard = deck.cards[randomIndex - 1];

  return {
    kind: QuestionType.AdjacentBefore,
    question: `What card is immediately before the ${VALUE_DISPLAY_NAMES[card.value]} of ${card.suit}?`,
    questionCard: card,
    answer: {
      kind: AnswerType.Card,
      value: adjacentCard,
    },
  };
}

export function generateRandomAdjacentAfterQuestion(deck: Deck): Question {
  // Ensure we don't pick the last card
  const randomIndex = Math.floor(Math.random() * (deck.cards.length - 1));
  const card = deck.cards[randomIndex];
  const adjacentCard = deck.cards[randomIndex + 1];

  return {
    kind: QuestionType.AdjacentAfter,
    question: `What card is immediately after the ${VALUE_DISPLAY_NAMES[card.value]} of ${card.suit}?`,
    questionCard: card,
    answer: {
      kind: AnswerType.Card,
      value: adjacentCard,
    },
  };
}

export function generateRandomCutCalculationQuestion(deck: Deck): Question {
  const randomCutIndex = Math.floor(Math.random() * deck.cards.length);
  const cutCard = deck.cards[randomCutIndex];

  const randomIndex = Math.floor(Math.random() * deck.cards.length);
  const card = deck.cards[(randomCutIndex + randomIndex) % deck.cards.length];

  return {
    kind: QuestionType.CutCalculation,
    question: `If ${VALUE_DISPLAY_NAMES[cutCard.value]} of ${cutCard.suit} is at the top, which card is now at position ${randomIndex + 1}?`,
    questionCard: cutCard,
    questionPosition: randomIndex + 1,
    answer: {
      kind: AnswerType.Card,
      value: card,
    },
  };
}
