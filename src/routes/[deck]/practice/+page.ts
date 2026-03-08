import { parsePracticeSettings } from "$lib/utils/practice";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ url, params, parent }) => {
  const practiceSettings = parsePracticeSettings(url);
  const { deck } = await parent();

  if (!practiceSettings) {
    throw redirect(302, `/${deck.id}/configure-practice-session`);
  }

  return {
    practiceSettings,
  };
};
