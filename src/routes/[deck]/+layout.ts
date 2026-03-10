import type { LayoutLoad } from "./$types";
import { getDeck } from "$lib/utils/decks";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = ({ params }) => {
  const deck = getDeck(params.deck);

  if (!deck) {
    return redirect(302, "/");
  }

  return { deck };
};
