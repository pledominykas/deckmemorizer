import { loadPracticeState } from "$lib/utils/practice";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { deck } = await parent();
  const practiceState = loadPracticeState();

  if (!practiceState) {
    throw redirect(302, `/${deck.id}/configure-practice-session`);
  }

  return {
    practiceState,
  };
};
