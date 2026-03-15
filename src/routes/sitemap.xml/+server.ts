import { DECKS } from "$lib/constants/decks";
import type { RequestHandler } from "./$types";

const BASE_URL = "https://deckmemorizer.com";

export const prerender = true;

export const GET: RequestHandler = () => {
  const base = BASE_URL;

  const staticPages = [
    { path: "/", priority: "1.0" },
  ];

  const deckPages = Object.values(DECKS).flatMap((deck) => [
    { path: `/${deck.id}`, priority: "0.9" },
    { path: `/${deck.id}/browse`, priority: "0.8" },
    { path: `/${deck.id}/configure-practice-session`, priority: "0.7" },
  ]);

  const pages = [...staticPages, ...deckPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${base}${page.path}</loc>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
