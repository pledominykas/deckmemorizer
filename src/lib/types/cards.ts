export interface Deck {
  id: string;
  title: string;
  longTitle: string;
  author: string;
  shortDescription: string;
  longDescription: string;
  pageDescription: string;
  cards: Card[];
}

export enum CardSuit {
  Spades = "Spades",
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
}

export enum CardValue {
  Ace = "A",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
}

export const VALUE_DISPLAY_NAMES: Record<CardValue, string> = {
  [CardValue.Two]: "2",
  [CardValue.Three]: "3",
  [CardValue.Four]: "4",
  [CardValue.Five]: "5",
  [CardValue.Six]: "6",
  [CardValue.Seven]: "7",
  [CardValue.Eight]: "8",
  [CardValue.Nine]: "9",
  [CardValue.Ten]: "10",
  [CardValue.Jack]: "Jack",
  [CardValue.Queen]: "Queen",
  [CardValue.King]: "King",
  [CardValue.Ace]: "Ace",
};

export interface Card {
  suit: CardSuit;
  value: CardValue;
  position: number;
}
