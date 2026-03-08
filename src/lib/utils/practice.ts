import type { Deck } from "$lib/types/cards";
import type { PracticeSettings, PracticeState } from "$lib/types/practice";
import { AnswerType, QuestionType, type Answer } from "$lib/types/questions";
import { generateRandomQuestion } from "./questions";

export const parsePracticeSettings = (url: URL): PracticeSettings | null => {
  const typesParam = url.searchParams.get("types");
  const countParam = url.searchParams.get("count");

  if (!typesParam || !countParam) {
    return null;
  }

  const selectedQuestionTypes: QuestionType[] = typesParam
    ? typesParam
        .split(",")
        .filter((type): type is QuestionType =>
          Object.values(QuestionType).includes(type as QuestionType),
        )
    : [];

  const numberOfQuestions = parseInt(countParam);

  return {
    selectedQuestionTypes,
    numberOfQuestions: isNaN(numberOfQuestions) ? 10 : numberOfQuestions,
  };
};

export const savePracticeState = (state: PracticeState) => {
  localStorage.setItem("practiceState", JSON.stringify(state));
};

export const clearPracticeSession = () => {
  localStorage.removeItem("practiceState");
};

export const loadPracticeState = (): PracticeState | null => {
  try {
    const stored = localStorage.getItem("practiceState");

    if (stored) {
      return JSON.parse(stored) as PracticeState;
    }
  } catch {}

  return null;
};

export const loadOrCreatePracticeState = (
  deck: Deck,
  practiceSettings: PracticeSettings,
) => {
  let practiceState = loadPracticeState();

  if (!practiceState) {
    const newState: PracticeState = {
      answeredQuestionCount: 0,
      correctAnswerCount: 0,
      currentStreak: 0,
      currentQuestion: generateRandomQuestion(deck, practiceSettings),
    };

    savePracticeState(newState);

    practiceState = newState;
  }

  return practiceState;
};

export const updatePracticeProgress = (
  practiceState: PracticeState,
  answer: Answer,
) => {
  const isCorrect = isCorrectAnswer(
    answer,
    practiceState.currentQuestion.answer,
  );

  practiceState.answeredQuestionCount += 1;
  practiceState.correctAnswerCount += isCorrect ? 1 : 0;
  practiceState.currentStreak = isCorrect ? practiceState.currentStreak + 1 : 0;

  savePracticeState(practiceState);
};

export const generateNextQuestion = (
  practiceState: PracticeState,
  deck: Deck,
  practiceSettings: PracticeSettings,
) => {
  practiceState.currentQuestion = generateRandomQuestion(
    deck,
    practiceSettings,
  );

  savePracticeState(practiceState);
};

export const isCorrectAnswer = (givenAnswer: Answer, correctAnswer: Answer) => {
  if (
    correctAnswer.kind == AnswerType.Position &&
    givenAnswer.kind == AnswerType.Position
  ) {
    return givenAnswer.value === correctAnswer.value;
  } else if (
    correctAnswer.kind == AnswerType.Card &&
    givenAnswer.kind == AnswerType.Card
  ) {
    return (
      givenAnswer.value.value === correctAnswer.value.value &&
      givenAnswer.value.suit === correctAnswer.value.suit
    );
  } else {
    throw new Error("Answer types do not match");
  }
};
