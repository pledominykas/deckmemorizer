import { CardSuit, CardValue, type Card } from "$lib/types/cards";

const VALUE_MAP: Record<string, CardValue> = {
  A: CardValue.Ace,
  "2": CardValue.Two,
  "3": CardValue.Three,
  "4": CardValue.Four,
  "5": CardValue.Five,
  "6": CardValue.Six,
  "7": CardValue.Seven,
  "8": CardValue.Eight,
  "9": CardValue.Nine,
  "10": CardValue.Ten,
  T: CardValue.Ten,
  J: CardValue.Jack,
  Q: CardValue.Queen,
  K: CardValue.King,
  a: CardValue.Ace,
  t: CardValue.Ten,
  j: CardValue.Jack,
  q: CardValue.Queen,
  k: CardValue.King,
  ace: CardValue.Ace,
  two: CardValue.Two,
  three: CardValue.Three,
  four: CardValue.Four,
  five: CardValue.Five,
  six: CardValue.Six,
  seven: CardValue.Seven,
  eight: CardValue.Eight,
  nine: CardValue.Nine,
  ten: CardValue.Ten,
  jack: CardValue.Jack,
  queen: CardValue.Queen,
  king: CardValue.King,
};

const SUIT_MAP: Record<string, CardSuit> = {
  S: CardSuit.Spades,
  H: CardSuit.Hearts,
  D: CardSuit.Diamonds,
  C: CardSuit.Clubs,
  "♠": CardSuit.Spades,
  "♥": CardSuit.Hearts,
  "♦": CardSuit.Diamonds,
  "♣": CardSuit.Clubs,
  spades: CardSuit.Spades,
  hearts: CardSuit.Hearts,
  diamonds: CardSuit.Diamonds,
  clubs: CardSuit.Clubs,
};

function splitToken(token: string): [string, string] | null {
  const fullName = token.match(/^(.+?)\s+of\s+(.+?)$/i);
  if (fullName)
    return [fullName[1].trim().toLowerCase(), fullName[2].trim().toLowerCase()];

  const shorthand = token.toUpperCase().match(/^(10|[2-9ATJQK])([SHDC♠♥♦♣])$/);
  if (shorthand) return [shorthand[1], shorthand[2]];

  return null;
}

function tokenize(input: string): string[] {
  return input
    .split(/[\n,]+/)
    .map((line) => line.replace(/^[\s*\-•·]+/, "").trim())
    .flatMap((line) => (line.includes(" of ") ? [line] : line.split(/[\s;|]+/)))
    .filter(Boolean);
}

export function parseCardNotation(input: string): Card[] | null {
  const tokens = tokenize(input);
  if (tokens.length !== 52) return null;

  const cards: Card[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const parts = splitToken(tokens[i]);
    if (!parts) return null;

    const value = VALUE_MAP[parts[0]];
    const suit = SUIT_MAP[parts[1]];
    if (!value || !suit) return null;

    cards.push({ value, suit, position: i + 1 });
  }
  return cards;
}
