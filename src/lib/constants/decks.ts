import type { Deck } from "$lib/types/cards";
import { MNEMONICA } from "./mnemonica";
import { REDFORD_STACK } from "./redford-stack";

export const DECKS: Record<string, Deck> = {
  [MNEMONICA.id]: MNEMONICA,
  [REDFORD_STACK.id]: REDFORD_STACK,
};
