"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AudiencePicker() {
  const { lang, t } = useLanguage();
  const Arrow = (
    <ArrowRight
      size={14}
      aria-hidden
      strokeWidth={1.5}
      style={lang === "AR" ? { transform: "scaleX(-1)" } : undefined}
    />
  );

  const cards = [
    {
      key: "consumer",
      href: "/sale",
      title: t.audience.consumer.title,
      sub: t.audience.consumer.sub,
      desc: t.audience.consumer.desc,
      cta: t.audience.consumer.cta,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      tag: lang === "EN" ? "01" : "٠١",
    },
    {
      key: "business",
      href: "/business",
      title: t.audience.business.title,
      sub: t.audience.business.sub,
      desc: t.audience.business.desc,
      cta: t.audience.business.cta,
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
      tag: lang === "EN" ? "02" : "٠٢",
    },
  ];

  return (
    <section aria-labelledby="audience-heading" className="container">
      <div
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          maxWidth: 720,
          marginInline: "auto",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
          {lang === "EN" ? "Who it's for" : "لمن هي"}
        </div>
        <h2 id="audience-heading" style={{ marginBottom: "1rem" }}>
          {t.audience.heading}
        </h2>
        <p style={{ fontSize: "1.05rem", maxWidth: 560, marginInline: "auto" }}>
          {t.audience.desc}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.75rem",
        }}
      >
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            aria-label={`${c.title} — ${c.cta}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <motion.article
              whileHover="hover"
              initial="rest"
              animate="rest"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--ink)",
                borderRadius: "var(--radius)",
                height: 460,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: "var(--ink-inverse)",
              }}
            >
              <motion.img
                src={c.img}
                alt=""
                aria-hidden
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.06 },
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.7,
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(26,22,19,0.15) 0%, rgba(26,22,19,0.35) 45%, rgba(26,22,19,0.92) 100%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: 28,
                  insetInlineStart: 28,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 28,
                    color: "var(--accent-soft)",
                  }}
                >
                  {c.tag}
                </span>
                <span aria-hidden style={{ width: 40, height: 1, background: "var(--accent)" }} />
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(243, 238, 229, 0.72)",
                    fontWeight: 500,
                  }}
                >
                  {c.sub}
                </span>
              </div>

              <div style={{ position: "relative", zIndex: 2, padding: "2.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    lineHeight: 1.1,
                    fontWeight: 400,
                    color: "var(--ink-inverse)",
                    marginBottom: "0.85rem",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    color: "rgba(243, 238, 229, 0.78)",
                    fontSize: "0.95rem",
                    marginBottom: "1.5rem",
                    maxWidth: 440,
                  }}
                >
                  {c.desc}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--accent-soft)",
                    fontWeight: 500,
                    paddingBottom: 6,
                    borderBottom: "1px solid var(--accent)",
                  }}
                >
                  {c.cta} {Arrow}
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
