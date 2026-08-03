import type { BlogPost } from "./types";
import { post as gettingSurgeryInMexico } from "./getting-surgery-in-mexico";
import { post as whatProcedureIsBestForMe } from "./what-procedure-is-best-for-me";
import { post as weightLossSurgeryInMexico } from "./weight-loss-surgery-in-mexico";

export type { BlogPost, BlogSection } from "./types";

/**
 * All published posts, newest first. To publish a new post:
 *  1. add a `<slug>.ts` file exporting a `post: BlogPost` (see types.ts),
 *  2. import it above and add it to this array.
 * The listing page, /blog/[slug] routes, and sitemap all derive from here.
 */
export const posts: BlogPost[] = [
  weightLossSurgeryInMexico,
  whatProcedureIsBestForMe,
  gettingSurgeryInMexico,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
