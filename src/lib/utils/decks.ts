import { DECKS } from "$lib/constants/decks";
import { getCustomDecks } from "$lib/state/custom-decks.svelte";

export const getDeck = (deckId: string) => {
  if (Object.prototype.hasOwnProperty.call(DECKS, deckId)) {
    return DECKS[deckId];
  }

  const custom = getCustomDecks();
  const encodedId = encodeURIComponent(deckId);
  if (Object.prototype.hasOwnProperty.call(custom, encodedId)) {
    return custom[encodedId];
  }

  return null;
};
