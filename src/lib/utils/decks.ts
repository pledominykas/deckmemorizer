import { DECKS } from "$lib/constants/decks";
import type { Deck } from "$lib/types/cards";

const CUSTOM_DECKS_KEY = "custom-decks";

function getStoredCustomDecks(): Record<string, Deck> {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_DECKS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export const getDeck = (deckId: string) => {
  if (Object.prototype.hasOwnProperty.call(DECKS, deckId)) {
    return DECKS[deckId];
  }

  const custom = getStoredCustomDecks();
  const encodedId = encodeURIComponent(deckId);
  if (Object.prototype.hasOwnProperty.call(custom, encodedId)) {
    return custom[encodedId];
  }

  return null;
};
