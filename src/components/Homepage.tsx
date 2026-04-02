import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animation helpers ──────────────────────────────────────────── */

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */

const services = [
  {
    icon: "⚙",
    title: "Engineering",
    description: "Faster PRs, better code, team-wide AI adoption.",
  },
  {
    icon: "◧",
    title: "Business Applications",
    description: "Custom AI tools built for your workflows.",
  },
  {
    icon: "◎",
    title: "Go-to-Market",
    description: "AI-assisted outreach, enablement, and pipeline.",
  },
  {
    icon: "▦",
    title: "Operations",
    description: "Automation that actually runs without babysitting.",
  },
  {
    icon: "△",
    title: "AI Strategy",
    description: "Where to start, what to build, how to sequence it.",
  },
];

const steps = [
  {
    num: "01",
    title: "Free Assessment",
    time: "5 - 15 hours",
    description:
      "We map your highest-leverage AI opportunities and deliver working prototypes, not recommendations.",
  },
  {
    num: "02",
    title: "Build Together",
    time: "Weeks, not months",
    description:
      "We embed in your team and build the actual systems. Side by side with your engineers and operators.",
  },
  {
    num: "03",
    title: "You Own It",
    time: "Permanent handoff",
    description:
      "We document, train, and hand off. You keep the tools. No retainers. No dependency.",
  },
];

const products = [
  {
    name: "Topiq",
    description:
      "AI sales inbox for outbound teams. Manages replies, books meetings, and keeps your pipeline moving.",
    link: "https://gettopiq.ai",
    tag: "Live",
  },
  {
    name: "Product 2",
    description:
      "Internal tooling platform for ops teams. Automates the workflows that slip through the cracks.",
    link: "#",
    tag: "Coming soon",
  },
  {
    name: "Product 3",
    description:
      "AI-native reporting layer. Pulls from your systems and surfaces what matters, without dashboards.",
    link: "#",
    tag: "Coming soon",
  },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function Homepage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#e8e5e0] antialiased selection:bg-amber-400/20 selection:text-amber-200">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 z-40 w-full border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <a
            href="/"
            className="font-serif text-2xl font-bold tracking-tight text-white"
          >
            Basiq
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#services"
              className="text-sm tracking-wide text-[#a09d97] transition-colors hover:text-white"
            >
              Services
            </a>
            <a
              href="#work"
              className="text-sm tracking-wide text-[#a09d97] transition-colors hover:text-white"
            >
              Work
            </a>
            <div className="group relative">
              <button className="text-sm tracking-wide text-[#a09d97] transition-colors hover:text-white">
                Products
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-lg border border-white/[0.08] bg-[#141414] p-2 shadow-2xl">
                  <a
                    href="https://gettopiq.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md px-3 py-2.5 text-sm text-[#a09d97] transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    Topiq
                    <span className="ml-2 text-xs text-amber-400/70">
                      gettopiq.ai
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2.5 text-sm text-[#a09d97]/50"
                  >
                    More coming soon
                  </a>
                </div>
              </div>
            </div>
            <a
              href="#about"
              className="text-sm tracking-wide text-[#a09d97] transition-colors hover:text-white"
            >
              About
            </a>
          </div>
          <a
            href="#book-call"
            className="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:bg-amber-300"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <header className="relative flex min-h-screen items-center overflow-hidden pt-20">
        {/* Grid lines background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>
        {/* Gradient glow */}
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80">
              AI Execution Partner
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              We build AI into your business.
              <br />
              <span className="text-[#a09d97]">Not decks about it.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[#a09d97] md:text-xl"
          >
            Basiq is an AI execution partner for companies that need working
            systems, not slide decks. We ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4,
            }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#book-call"
              className="rounded-lg bg-amber-400 px-7 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
            >
              Book a Free Assessment
            </a>
            <a
              href="#work"
              className="rounded-lg border border-white/[0.12] px-7 py-3.5 text-sm font-medium text-[#e8e5e0] transition-all hover:border-white/[0.25] hover:bg-white/[0.04]"
            >
              See Our Work
            </a>
          </motion.div>
        </div>
      </header>

      {/* ─── POSITIONING STATEMENT ───────────────────────────── */}
      <Section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
          <FadeUp>
            <p className="max-w-4xl font-serif text-2xl leading-relaxed text-[#c8c5bf] md:text-3xl lg:text-4xl lg:leading-snug">
              Most AI engagements end with a strategy doc and a thank you. Ours
              end with tools your team uses on Monday. We work alongside your
              engineers, sales teams, and ops. And we leave when there's a
              working system in place, not before.
            </p>
          </FadeUp>
        </div>
      </Section>

      {/* ─── SERVICE PILLARS ─────────────────────────────────── */}
      <Section className="border-t border-white/[0.06]" id="services">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
          <FadeUp>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80">
              What we do
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Five ways we deploy AI
            </h2>
          </FadeUp>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.08}>
                <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-amber-400/20 hover:bg-white/[0.04] lg:p-8">
                  <span className="text-2xl text-amber-400/70">{s.icon}</span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a09d97]">
                    {s.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── HOW IT STARTS ───────────────────────────────────── */}
      <Section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
          <FadeUp>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80">
              How it works
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Three steps. No mystery.
            </h2>
          </FadeUp>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="relative">
                  <span className="font-mono text-5xl font-bold text-white/[0.06]">
                    {step.num}
                  </span>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-amber-400/60">
                      {step.time}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#a09d97]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SOCIAL PROOF ────────────────────────────────────── */}
      <Section className="border-t border-white/[0.06]" id="work">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
          {/* Logo row */}
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-30">
              {["Acme Corp", "Meridian", "Nomad", "Pylon", "Vertex"].map(
                (name) => (
                  <span
                    key={name}
                    className="font-mono text-sm uppercase tracking-[0.15em] text-[#a09d97]"
                  >
                    {name}
                  </span>
                ),
              )}
            </div>
          </FadeUp>

          {/* Quote */}
          <FadeUp delay={0.15}>
            <div className="mx-auto mt-20 max-w-3xl text-center">
              <blockquote className="font-serif text-xl leading-relaxed text-[#c8c5bf] md:text-2xl">
                "They didn't just tell us where to use AI. They built it, trained
                the team, and it was running in production before the contract
                ended. That never happens."
              </blockquote>
              <div className="mt-8">
                <p className="text-sm font-medium text-white">Jordan Keller</p>
                <p className="mt-1 text-xs text-[#a09d97]">
                  VP Engineering, Meridian
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ─── PRODUCTS AS PROOF ───────────────────────────────── */}
      <Section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
          <FadeUp>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80">
              Products
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
              We build tools we use ourselves.
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#a09d97]">
              The products we've shipped are the same systems we bring to
              clients.
            </p>
          </FadeUp>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.1}>
                <a
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    p.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-amber-400/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {p.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        p.tag === "Live"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-white/[0.06] text-[#a09d97]"
                      }`}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#a09d97]">
                    {p.description}
                  </p>
                  <span className="mt-6 inline-block text-sm text-amber-400/70 transition-colors group-hover:text-amber-400">
                    Learn more →
                  </span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CTA FOOTER SECTION ──────────────────────────────── */}
      <Section className="border-t border-white/[0.06]" id="book-call">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp>
              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Not sure where to start?
                <br />
                That's what the assessment is for.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#a09d97]">
                It's free. It takes a few hours. You'll walk away with a clear
                picture of where AI moves the needle for your business and a
                working prototype to prove it.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <a
                href="#book-call"
                className="mt-10 inline-block rounded-lg bg-amber-400 px-8 py-4 text-sm font-semibold text-[#0a0a0a] transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
              >
                Book Your Free Assessment
              </a>
            </FadeUp>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <a
                href="/"
                className="font-serif text-xl font-bold tracking-tight text-white"
              >
                Basiq
              </a>
              <p className="mt-3 text-sm text-[#a09d97]">
                AI execution partner.
                <br />
                Working systems, not slide decks.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a09d97]">
                Company
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#services"
                    className="text-sm text-[#706d67] transition-colors hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="text-sm text-[#706d67] transition-colors hover:text-white"
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-sm text-[#706d67] transition-colors hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-sm text-[#706d67] transition-colors hover:text-white"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a09d97]">
                Products
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://gettopiq.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#706d67] transition-colors hover:text-white"
                  >
                    Topiq
                  </a>
                </li>
                <li>
                  <span className="text-sm text-[#706d67]/50">
                    More coming soon
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a09d97]">
                Connect
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#book-call"
                    className="text-sm text-[#706d67] transition-colors hover:text-white"
                  >
                    Book a Call
                  </a>
                </li>
                <li>
                  <span className="text-sm text-[#706d67]">basiq.work</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-[#706d67] md:flex-row">
            <p>&copy; 2025 Basiq. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
