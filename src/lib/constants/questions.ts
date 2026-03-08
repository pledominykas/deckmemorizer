import { QuestionType } from "$lib/types/questions";

export const QUESTION_TYPE_DATA: Record<
  QuestionType,
  {
    kind: QuestionType;
    name: string;
    description: string;
    checkedByDefault: boolean;
  }
> = {
  [QuestionType.Positional]: {
    kind: QuestionType.Positional,
    name: "Positional",
    description: "What card is at position 23 in the deck?",
    checkedByDefault: true,
  },
  [QuestionType.ReversePositional]: {
    kind: QuestionType.ReversePositional,
    name: "Reverse Positional",
    description: "At what position is the 5 of Hearts in the deck?",
    checkedByDefault: true,
  },
  [QuestionType.AdjacentBefore]: {
    kind: QuestionType.AdjacentBefore,
    name: "Adjacent Before",
    description: "What card comes before the Jack of Spades in the deck?",
    checkedByDefault: false,
  },
  [QuestionType.AdjacentAfter]: {
    kind: QuestionType.AdjacentAfter,
    name: "Adjacent After",
    description: "What card comes after the 3 of Diamonds in the deck?",
    checkedByDefault: false,
  },
  [QuestionType.CutCalculation]: {
    kind: QuestionType.CutCalculation,
    name: "Cut Calculation",
    description:
      "If Queen of Clubs is at the top, what card will be at position 10?",
    checkedByDefault: false,
  },
};
