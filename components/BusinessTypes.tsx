"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  Landmark,
  UserCheck,
  Wrench,
  Repeat,
  KeyRound,
  Banknote,
  TrendingUp,
} from "lucide-react";

type Variant = "section" | "page";

export default function BusinessTypes({ variant = "section" }: { variant?: Variant }) {
  const { lang, t } = useLanguage();

  const types = [
    { key: "broker", icon: Building2, num: "01" },
    { key: "developer", icon: Landmark, num: "02" },
    { key: "agent", icon: UserCheck, num: "03" },
    { key: "propertyManager", icon: Wrench, num: "04" },
    { key: "resale", icon: Repeat, num: "05" },
    { key: "rental", icon: KeyRound, num: "06" },
    { key: "mortgage", icon: Banknote, num: "07" },
    { key: "investor", icon: TrendingUp, num: "08" },
  ] as const;

  return (
    <section
      aria-labelledby="business-heading"
      style={{
        background: "var(--surface-warm)",
        paddingTop: 110,
        paddingBottom: 110,
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            maxWidth: 760,
            marginInline: "auto",
          }}
        >
          <div className="eyebrow" style={{ marginBottom: "1.25rem" }}>
            {t.business.sub}
          </div>
          <h2 id="business-heading" style={{ marginBottom: "1rem" }}>
            {t.business.heading}
          </h2>
          <p style={{ fontSize: "1.05rem" }}>{t.business.desc}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 0,
            border: "1px solid var(--border-soft)",
            background: "var(--border-soft)",
          }}
        >
          {types.map(({ key, icon: Icon, num }) => {
            const item = t.business.types[key];
            return (
              <article
                key={key}
                style={{
                  background: "var(--surface-warm)",
                  padding: "2.25rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  transition: "var(--transition)",
                  minHeight: 260,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 20,
                      color: "var(--accent)",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    aria-hidden
                    style={{ width: 24, height: 1, background: "var(--accent)" }}
                  />
                  <Icon size={16} color="var(--ink)" strokeWidth={1.5} aria-hidden />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    lineHeight: 1.2,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.92rem", margin: 0 }}>{item.desc}</p>
              </article>
            );
          })}
        </div>

        {variant === "section" && (
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/business" className="btn-primary">
              {t.business.learnMore}
            </Link>
          </div>
        )}

        {lang === "AR" ? null : null}
      </div>
    </section>
  );
}
