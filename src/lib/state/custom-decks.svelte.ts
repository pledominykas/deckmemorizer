import type { Deck } from "$lib/types/cards";
import { CUSTOM_DECKS_STORAGE_KEY } from "$lib/constants/storage-keys";

function loadFromStorage(): Record<string, Deck> {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_DECKS_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

let customDecks = $state<Record<string, Deck>>(loadFromStorage());

export function getCustomDecks() {
  return customDecks;
}

export function addCustomDeck(deck: Deck) {
  customDecks = { ...customDecks, [deck.id]: deck };
  localStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(customDecks));
}

export function removeCustomDeck(id: string) {
  const { [id]: _, ...rest } = customDecks;
  customDecks = rest;
  localStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(customDecks));
}
