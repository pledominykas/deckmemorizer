import { DECKS } from "$lib/constants/decks";
import type { EntryGenerator } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () => {
  return Object.keys(DECKS).map((deck) => ({ deck }));
};
