import { describe, it, expect } from "vitest";
import { parseCardNotation } from "./parse-deck.js";
import { CardSuit, CardValue, type Card } from "../types/cards.js";
import { MNEMONICA } from "../constants/mnemonica.js";

const DEFAULT_VALUES: Record<CardValue, string> = {
  [CardValue.Ace]: "A",
  [CardValue.Two]: "2",
  [CardValue.Three]: "3",
  [CardValue.Four]: "4",
  [CardValue.Five]: "5",
  [CardValue.Six]: "6",
  [CardValue.Seven]: "7",
  [CardValue.Eight]: "8",
  [CardValue.Nine]: "9",
  [CardValue.Ten]: "T",
  [CardValue.Jack]: "J",
  [CardValue.Queen]: "Q",
  [CardValue.King]: "K",
};

const DEFAULT_SUITS: Record<CardSuit, string> = {
  [CardSuit.Spades]: "S",
  [CardSuit.Hearts]: "H",
  [CardSuit.Diamonds]: "D",
  [CardSuit.Clubs]: "C",
};

function formatDeck(
  cards: Card[],
  options: {
    separator: string;
    values?: Partial<Record<CardValue, string>>;
    suits?: Partial<Record<CardSuit, string>>;
    template?: (value: string, suit: string) => string;
  },
): string {
  const values = { ...DEFAULT_VALUES, ...options.values };
  const suits = { ...DEFAULT_SUITS, ...options.suits };
  const template = options.template ?? ((v, s) => `${v}${s}`);
  return cards
    .map((c) => template(values[c.value], suits[c.suit]))
    .join(options.separator);
}

function assertCards(result: Card[] | null, expected: Card[]): void {
  expect(result).not.toBeNull();
  expect(result).toHaveLength(expected.length);
  result!.forEach((card, i) => {
    expect(card, `card at position ${i + 1}`).toEqual({
      suit: expected[i].suit,
      value: expected[i].value,
      position: i + 1,
    });
  });
}

const UNICODE_SUITS: Partial<Record<CardSuit, string>> = {
  [CardSuit.Spades]: "♠",
  [CardSuit.Hearts]: "♥",
  [CardSuit.Diamonds]: "♦",
  [CardSuit.Clubs]: "♣",
};

const SPELLED_VALUES: Partial<Record<CardValue, string>> = {
  [CardValue.Ace]: "Ace",
  [CardValue.Two]: "Two",
  [CardValue.Three]: "Three",
  [CardValue.Four]: "Four",
  [CardValue.Five]: "Five",
  [CardValue.Six]: "Six",
  [CardValue.Seven]: "Seven",
  [CardValue.Eight]: "Eight",
  [CardValue.Nine]: "Nine",
  [CardValue.Ten]: "Ten",
  [CardValue.Jack]: "Jack",
  [CardValue.Queen]: "Queen",
  [CardValue.King]: "King",
};

const SUIT_NAMES: Partial<Record<CardSuit, string>> = {
  [CardSuit.Spades]: "Spades",
  [CardSuit.Hearts]: "Hearts",
  [CardSuit.Diamonds]: "Diamonds",
  [CardSuit.Clubs]: "Clubs",
};

const ofTemplate = (v: string, s: string) => `${v} of ${s}`;

const DECK = MNEMONICA.cards;

describe("parseCardNotation", () => {
  describe("shorthand with T for Ten", () => {
    it("parses space-separated", () => {
      assertCards(
        parseCardNotation(formatDeck(DECK, { separator: " " })),
        DECK,
      );
    });
    it("parses comma-separated", () => {
      assertCards(
        parseCardNotation(formatDeck(DECK, { separator: ", " })),
        DECK,
      );
    });
    it("parses newline-separated", () => {
      assertCards(
        parseCardNotation(formatDeck(DECK, { separator: "\n" })),
        DECK,
      );
    });
    it("parses lowercase", () => {
      assertCards(
        parseCardNotation(formatDeck(DECK, { separator: " " }).toLowerCase()),
        DECK,
      );
    });
  });

  describe("shorthand with 10 for Ten", () => {
    it("parses space-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: " ",
            values: { [CardValue.Ten]: "10" },
          }),
        ),
        DECK,
      );
    });
    it("parses comma-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: ", ",
            values: { [CardValue.Ten]: "10" },
          }),
        ),
        DECK,
      );
    });
  });

  describe("shorthand with unicode suits", () => {
    it("parses comma-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, { separator: ", ", suits: UNICODE_SUITS }),
        ),
        DECK,
      );
    });
    it("parses space-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, { separator: " ", suits: UNICODE_SUITS }),
        ),
        DECK,
      );
    });
    it("parses newline-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, { separator: "\n", suits: UNICODE_SUITS }),
        ),
        DECK,
      );
    });
    it("parses with 10 for Ten", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: ", ",
            suits: UNICODE_SUITS,
            values: { [CardValue.Ten]: "10" },
          }),
        ),
        DECK,
      );
    });
  });

  describe("full name with numeric values", () => {
    it("parses newline-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: "\n",
            suits: SUIT_NAMES,
            template: ofTemplate,
          }),
        ),
        DECK,
      );
    });
    it("parses comma-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: ", ",
            suits: SUIT_NAMES,
            template: ofTemplate,
          }),
        ),
        DECK,
      );
    });
  });

  describe("full name with spelled values", () => {
    it("parses newline-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: "\n",
            values: SPELLED_VALUES,
            suits: SUIT_NAMES,
            template: ofTemplate,
          }),
        ),
        DECK,
      );
    });
    it("parses comma-separated", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: ", ",
            values: SPELLED_VALUES,
            suits: SUIT_NAMES,
            template: ofTemplate,
          }),
        ),
        DECK,
      );
    });
    it("parses lowercase", () => {
      assertCards(
        parseCardNotation(
          formatDeck(DECK, {
            separator: "\n",
            values: SPELLED_VALUES,
            suits: SUIT_NAMES,
            template: ofTemplate,
          }).toLowerCase(),
        ),
        DECK,
      );
    });
  });

  describe("invalid inputs", () => {
    it("returns null for empty string", () => {
      expect(parseCardNotation("")).toBeNull();
    });
    it("returns null for fewer than 52 cards", () => {
      expect(
        parseCardNotation(formatDeck(DECK.slice(0, 3), { separator: " " })),
      ).toBeNull();
    });
    it("returns null for an invalid suit letter", () => {
      expect(
        parseCardNotation(
          formatDeck(DECK, { separator: " " }).replace("4C", "4X"),
        ),
      ).toBeNull();
    });
    it("returns null for an invalid suit name", () => {
      expect(
        parseCardNotation(
          formatDeck(DECK, {
            separator: "\n",
            values: SPELLED_VALUES,
            suits: SUIT_NAMES,
            template: ofTemplate,
          }).replace("Clubs", "Jokers"),
        ),
      ).toBeNull();
    });
    it("returns null for an invalid value name", () => {
      expect(
        parseCardNotation(
          formatDeck(DECK, {
            separator: "\n",
            values: SPELLED_VALUES,
            suits: SUIT_NAMES,
            template: ofTemplate,
          }).replace("Four of Clubs", "Eleven of Clubs"),
        ),
      ).toBeNull();
    });
  });
});
