/**
 * Single source of truth for the Basiq product suite.
 *
 * Consumed by the homepage grid / nav dropdown / footer (src/components/Homepage.tsx),
 * the shared nav + footer (src/layouts/Layout.astro), and the /products hub.
 * Add a product here once and every surface picks it up.
 *
 * Products with `external: true` live on their own domain and have no page on
 * basiq.work and link out. The rest have a detail page under /products/<slug>.
 */

export type ProductStatus = "live" | "coming-soon";

export interface Product {
  slug: string;
  name: string;
  /** Short market category, shown as a label on cards. */
  category: string;
  /** One line, used in the nav dropdown and as a card kicker. */
  tagline: string;
  /** One to two sentences, used on the homepage grid and the /products hub. */
  description: string;
  href: string;
  external: boolean;
  /** Bare host shown next to external links, e.g. "gettopiq.ai". */
  host?: string;
  status: ProductStatus;
}

export const products: Product[] = [
  {
    slug: "qindle",
    name: "Qindle",
    category: "Pipegen",
    tagline: "The prospecting CRM built for AEs",
    description:
      "The only prospecting CRM built for Account Executives to focus on account and prospect discovery, and the human parts of pipe gen: cold calling and video.",
    href: "/products/qindle",
    external: false,
    status: "live",
  },
  {
    slug: "topiq",
    name: "Topiq",
    category: "Deal Management",
    tagline: "AI sales inbox for outbound teams",
    description:
      "Manages replies, books meetings, and keeps your pipeline moving. The AI sales inbox for teams running outbound at volume.",
    href: "https://gettopiq.ai",
    external: true,
    host: "gettopiq.ai",
    status: "live",
  },
  {
    slug: "fabriq",
    name: "Fabriq",
    category: "Customer Success",
    tagline: "Customer intelligence for CS leaders",
    description:
      "AI-powered customer intelligence for CS leaders managing net retention at scale. Stakeholder sentiment, expansion signal, and renewal forecasts built on evidence instead of gut feel.",
    href: "/products/fabriq",
    external: false,
    status: "live",
  },
  {
    slug: "musal",
    name: "Musal",
    category: "AI Tooling",
    tagline: "The prompt workshop for AI teams",
    description:
      "Sharpen your prompts, compare models on real examples, and ship the best version live without waiting on engineering.",
    href: "https://www.musal.ai",
    external: true,
    host: "musal.ai",
    status: "live",
  },
];

export const PRODUCTS_HREF = "/products";

/** Label for a product's status badge. */
export function statusLabel(status: ProductStatus): string {
  return status === "live" ? "Live" : "Coming soon";
}

/** Call-to-action text on a product card. */
export function ctaLabel(product: Product): string {
  return product.external ? `Visit ${product.host} ↗` : "Learn more →";
}
