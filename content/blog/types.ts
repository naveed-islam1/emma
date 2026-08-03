export type BlogSection = {
  /** Large section heading (rendered as h2) */
  heading?: string;
  /** Bold sub-topic heading (rendered as h3, listed in the sidebar) */
  subheading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type BlogPost = {
  /** URL segment: /blog/[slug] — lowercase, hyphen-separated */
  slug: string;
  /** Display title (page h1 and card title) */
  title: string;
  /** <title> tag; defaults to title if omitted */
  seoTitle?: string;
  /** Meta description (~150 chars) */
  description: string;
  /** Card + OG image path under /public */
  image: string;
  readTimeMinutes: number;
  /** ISO date */
  publishedAt: string;
  /** ISO date; defaults to publishedAt */
  updatedAt?: string;
  /** Card badge, e.g. "Popular" */
  tag?: string;
  sections: BlogSection[];
};
