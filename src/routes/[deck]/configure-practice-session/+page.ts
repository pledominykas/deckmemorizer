import { clearPracticeSession } from "$lib/utils/practice";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url, params }) => {
  clearPracticeSession();
};
