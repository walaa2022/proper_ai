"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EntryPoints() {
  const { lang, t } = useLanguage();

  const entries = [
    {
      title: t.consumerTypes.buying.title,
      id: "buying",
      href: "/sale",
      description: t.consumerTypes.buying.desc,
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
      num: "01",
    },
    {
      title: t.consumerTypes.renting.title,
      id: "renting",
      href: "/rental",
      description: t.consumerTypes.renting.desc,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      num: "02",
    },
    {
      title: t.consumerTypes.investing.title,
      id: "investing",
      href: "/brokerage",
      description: t.consumerTypes.investing.desc,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      num: "03",
    },
    {
      title: t.consumerTypes.selling.title,
      id: "selling",
      href: "/contact",
      description: t.consumerTypes.selling.desc,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      num: "04",
    },
  ];

  const arrow = (
    <ArrowRight
      size={14}
      aria-hidden
      strokeWidth={1.5}
      style={lang === "AR" ? { transform: "scaleX(-1)" } : undefined}
    />
  );

  return (
    <section className="container" aria-labelledby="entry-heading">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "3.5rem",
          maxWidth: "100%",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
            {lang === "EN" ? "For home-seekers" : "للباحثين عن منزل"}
          </div>
          <h2 id="entry-heading" style={{ marginBottom: "0.75rem" }}>
            {t.entryPoints.dreamHeader}{" "}
            <span className="italic-accent" style={{ fontSize: "inherit" }}>
              {t.entryPoints.dreamSub}
            </span>
          </h2>
          <p style={{ fontSize: "1.02rem" }}>{t.entryPoints.desc}</p>
        </div>
        <hr className="hr-accent" style={{ marginBottom: 8 }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {entries.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
            aria-label={`${item.title}`}
          >
            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  borderRadius: "var(--radius)",
                  background: "var(--ink)",
                }}
              >
                <motion.img
                  src={item.img}
                  alt=""
                  aria-hidden
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 16,
                    insetInlineStart: 16,
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 20,
                    color: "var(--ink-inverse)",
                    textShadow: "0 1px 8px rgba(0,0,0,0.25)",
                  }}
                >
                  {item.num}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    lineHeight: 1.15,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.95rem", margin: 0 }}>{item.description}</p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--ink)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                  }}
                >
                  {lang === "EN" ? "Discover" : "استكشف"} {arrow}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
