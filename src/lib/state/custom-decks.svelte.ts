import type { Deck } from "$lib/types/cards";

const STORAGE_KEY = "custom-decks";

function loadFromStorage(): Record<string, Deck> {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customDecks));
}
