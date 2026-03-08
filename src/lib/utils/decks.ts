import { DECKS } from "$lib/constants/decks";

export const getDeck = (deckId: string) => {
  if (!DECKS.hasOwnProperty(deckId)) {
    return null;
  }

  return DECKS[deckId];
};
