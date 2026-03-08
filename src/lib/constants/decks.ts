import type { Deck } from "$lib/types/cards";
import { ARONSON_STACK } from "./aronson-stack";
import { MEMORANDUM } from "./memorandum";
import { MNEMONICA } from "./mnemonica";
import { REDFORD_STACK } from "./redford-stack";
import { SI_STEBBINS } from "./si-stebbins";

export const DECKS: Record<string, Deck> = {
  [MNEMONICA.id]: MNEMONICA,
  [REDFORD_STACK.id]: REDFORD_STACK,
  [ARONSON_STACK.id]: ARONSON_STACK,
  [SI_STEBBINS.id]: SI_STEBBINS,
  [MEMORANDUM.id]: MEMORANDUM,
};
