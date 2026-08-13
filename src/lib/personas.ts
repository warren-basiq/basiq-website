/**
 * The audiences behind the Solutions menu.
 *
 * Consumed by the nav dropdown and footer (src/layouts/Layout.astro) and the
 * page registry (src/lib/site-pages.ts). Add a persona here once and every
 * navigation surface picks it up; the page itself lives at `href`.
 */

export interface Persona {
  slug: string;
  /** Link text in the Solutions dropdown. */
  navLabel: string;
  /** Link text in the footer, which reads "For ..." */
  footerLabel: string;
  href: string;
}

export const personas: Persona[] = [
  {
    slug: "founders",
    navLabel: "Founders and CEOs",
    footerLabel: "For Founders and CEOs",
    href: "/founders",
  },
  {
    slug: "revenue-leaders",
    navLabel: "CROs and VPs of Sales",
    footerLabel: "For CROs and VPs of Sales",
    href: "/revenue-leaders",
  },
];
