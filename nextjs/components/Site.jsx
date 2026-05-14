"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ImageSlotLoader from "./ImageSlotLoader";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakSelect,
  TweakRadio,
} from "./TweaksPanel";

const TWEAK_DEFAULTS = {
  typePair: "lora",
  density: "comfortable",
  heroVariant: "centered",
};

const TYPE_PAIRS = {
  lora: {
    serif: "'Lora', Georgia, serif",
    sans: "'Public Sans', system-ui, sans-serif",
  },
  cormorant: {
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Inter', system-ui, sans-serif",
  },
  ebgaramond: {
    serif: "'EB Garamond', Georgia, serif",
    sans: "'Space Grotesk', system-ui, sans-serif",
  },
  fraunces: {
    serif: "'Fraunces', Georgia, serif",
    sans: "'Public Sans', system-ui, sans-serif",
  },
};

// ── scroll-reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "1");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    document
      .querySelectorAll(
        ".reveal:not([data-shown='1']), .mask-line:not([data-shown='1']), .img-wipe:not([data-shown='1'])",
      )
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ── topbar ─────────────────────────────────────────────────────────────────
function Topbar() {
  return (
    <header className="topbar">
      <a href="#top" className="brand">
        Or Levy
      </a>
      <nav>
        <a href="#services">Services</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

// ── hero ───────────────────────────────────────────────────────────────────
function Hero({ variant }) {
  return (
    <section className="hero wrap" id="top" data-variant={variant}>
      <div className="hero-grid">
        <div>
          <div className="eyebrow reveal" style={{ marginBottom: 40 }}>
            Or Levy — Independent practice
          </div>
          <h1 className="display">
            <span className="mask-line" data-delay="1">
              <span>
                Hey, I&apos;m <em>Or</em>.
              </span>
            </span>
          </h1>
          <p className="hero-sub reveal" data-delay="3">
            HR Consultant &amp; Career Advisor.
          </p>

          <div className="hero-meta reveal" data-delay="5">
            <div className="row">
              <span className="k">Practice</span>
              <span className="v">
                HR consulting · Career advisory · Founder coaching
              </span>
            </div>
            <div className="row">
              <span className="k">Based</span>
              <span className="v">Tel Aviv</span>
            </div>
            <div className="row">
              <span className="k">Working</span>
              <span className="v">Worldwide</span>
            </div>
          </div>
        </div>
        <div className="hero-portrait img-wipe">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/or-portrait.png" alt="Or Levy" />
        </div>
      </div>
    </section>
  );
}

// ── services ───────────────────────────────────────────────────────────────
const SERVICES = [
  {
    n: "01",
    t: "Career Advising.",
    d: "For individuals navigating a career move, job search, or full transition. We'll work on your positioning, your CV, and your strategy — together.",
    meta: "One on one",
  },
  {
    n: "02",
    t: "Organizational design.",
    d: "For CEOs and leadership teams building the right culture, employee experience, and people infrastructure. From hiring strategy to manager guidance — I'm your partner.",
    meta: "For companies and leaders",
  },
  {
    n: "03",
    t: "Founder coaching.",
    d: "A standing conversation for founders and CEOs navigating the first hundred employees. Confidential, candid, and rooted in operational experience.",
    meta: "One on one",
  },
];

function Services() {
  return (
    <section className="section wrap" id="services">
      <div className="approach-grid">
        <aside className="approach-side reveal">
          <div className="eyebrow">— Services</div>
          <h2>Three things I do, well.</h2>
          <p className="small">
            I keep the practice small on purpose. Most months I work with three or
            four clients, and almost everything starts with a conversation rather
            than a proposal.
          </p>
        </aside>
        <div className="approach-list">
          {SERVICES.map((s, i) => (
            <div key={s.n} className="approach-item reveal" data-delay={i + 1}>
              <span className="num">{s.n}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
              <span className="meta">{s.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── testimonials ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Or is the rare advisor who talks less than the founder and ends up changing more. We made three hires and one structural decision because of her — and lost zero people the year after.",
    name: "Liesel Mercer",
    role: "Founder, Atelier Mercer",
    slot: "tst-1",
  },
  {
    id: "t2",
    quote:
      "She rebuilt our leveling and review process in six weeks. The first quarter after, our voluntary attrition dropped by half. I'd hire her again tomorrow.",
    name: "Daniel Roeh",
    role: "CEO, Form Studio",
    slot: "tst-2",
  },
  {
    id: "t3",
    quote:
      "I came to Or between roles, unsure what I wanted next. Six sessions later I had clarity, a CV I actually liked, and an offer I would have ignored without her.",
    name: "Maya Bercovitch",
    role: "VP Engineering",
    slot: "tst-3",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const n = TESTIMONIALS.length;
  const go = (next) => setI((p) => (p + next + n) % n);
  const trackRef = useRef(null);

  // Arrow-key navigation when section is on screen.
  useEffect(() => {
    const el = document.getElementById("testimonials");
    if (!el) return;
    let focused = false;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => (focused = e.isIntersecting)),
      { threshold: 0.5 },
    );
    io.observe(el);
    const onKey = (e) => {
      if (!focused) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="testimonials wrap reveal" id="testimonials">
      <div className="testimonials-head">
        <div>
          <div className="eyebrow">— Testimonials</div>
        </div>
      </div>

      <div className="car-viewport">
        <div
          ref={trackRef}
          className="car-track"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="car-slide">
              <blockquote>{t.quote}</blockquote>
              <div className="car-who">
                <div className="car-avatar">
                  <image-slot
                    id={t.slot}
                    placeholder="Portrait"
                    shape="rect"
                    style={{ width: "100%", height: "100%", display: "block" }}
                  />
                </div>
                <div className="car-attrib">
                  <span className="name">{t.name}</span>
                  <span className="role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="car-foot">
        <button className="car-btn" aria-label="Previous" onClick={() => go(-1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
        <span className="count">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button className="car-btn" aria-label="Next" onClick={() => go(1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
      </div>
    </section>
  );
}

// ── about ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="eyebrow reveal">— A bit about me</div>
        <h2 className="about-title reveal" data-delay="1">
          I came to HR through psychology — and I never quite left it behind.
        </h2>
        <div className="about-body reveal" data-delay="3">
          <p>
            I started in HR almost by accident — covering for a colleague at a
            small studio in Tel Aviv, sitting in on interviews I had no business
            running. I never quite left. Over the years I led people teams through
            funding rounds, reorganizations, two acquisitions, and a great many
            quiet Tuesday afternoons.
          </p>
          <p>
            I started this practice in 2018 because I wanted to do that work on my
            own terms — with fewer clients, longer engagements, and the time to
            listen properly. If any of this sounds like something you&apos;re
            sitting with, I&apos;d love to hear about it.
          </p>
        </div>
        <div className="about-sign reveal" data-delay="4">
          — Or
        </div>
      </div>
    </section>
  );
}

// ── contact ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="eyebrow reveal">— Get in touch</div>
        <h2 className="reveal" data-delay="1">
          Let&apos;s <em>talk</em>.
        </h2>
        <div className="contact-grid">
          <div className="contact-col reveal">
            <h4>Email</h4>
            <a href="mailto:or@orlevy.co">or@orlevy.co</a>
          </div>
          <div className="contact-col reveal" data-delay="1">
            <h4>LinkedIn</h4>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/orlevy
            </a>
          </div>
        </div>
        <div className="foot">
          <span>Tel Aviv · Worldwide</span>
        </div>
      </div>
    </section>
  );
}

// ── shell ──────────────────────────────────────────────────────────────────
export default function Site() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useLayoutEffect(() => {
    const pair = TYPE_PAIRS[t.typePair] || TYPE_PAIRS.lora;
    document.documentElement.style.setProperty("--font-serif", pair.serif);
    document.documentElement.style.setProperty("--font-sans", pair.sans);
    document.body.style.fontFamily = pair.sans;
    document.body.dataset.density = t.density;
  }, [t.typePair, t.density]);

  return (
    <>
      <ImageSlotLoader />
      <Topbar />
      <main>
        <Hero variant={t.heroVariant} />
        <Services />
        <Testimonials />
        <About />
      </main>
      <Contact />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Typography">
          <TweakSelect
            label="Type pair"
            value={t.typePair}
            options={[
              { value: "lora", label: "Lora · Public Sans" },
              { value: "cormorant", label: "Cormorant · Inter" },
              { value: "ebgaramond", label: "EB Garamond · Space Grotesk" },
              { value: "fraunces", label: "Fraunces · Public Sans" },
            ]}
            onChange={(v) => setTweak("typePair", v)}
          />
        </TweakSection>
        <TweakSection label="Density">
          <TweakRadio
            label="Spacing"
            value={t.density}
            options={["tight", "comfortable", "airy"]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakRadio
            label="Variant"
            value={t.heroVariant}
            options={[
              { value: "centered", label: "Aligned" },
              { value: "split", label: "Split" },
              { value: "stacked", label: "Display" },
            ]}
            onChange={(v) => setTweak("heroVariant", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
