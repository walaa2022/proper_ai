"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteFooter() {
  const { lang, t } = useLanguage();

  const columns = [
    {
      heading: t.footer.forBuyers,
      links: [
        { label: t.nav.sale, href: "/sale" },
        { label: t.featured.allCollections, href: "/sale" },
        { label: t.nav.contact, href: "/contact" },
      ],
    },
    {
      heading: t.footer.forRenters,
      links: [
        { label: t.nav.rental, href: "/rental" },
        { label: t.consumerTypes?.renting?.title ?? "Rentals", href: "/rental" },
        { label: t.nav.contact, href: "/contact" },
      ],
    },
    {
      heading: t.footer.forInvestors,
      links: [
        { label: t.consumerTypes?.investing?.title ?? "Investing", href: "/sale" },
        { label: t.nav.brokerage, href: "/brokerage" },
      ],
    },
    {
      heading: t.footer.forBusiness,
      links: [
        { label: t.nav.business, href: "/business" },
        { label: t.business.cta, href: "/contact" },
        { label: t.nav.login, href: "/login" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--ink-inverse)",
      }}
      aria-label={t.footer.tagline}
    >
      {/* Big wordmark band */}
      <div
        className="container"
        style={{
          paddingTop: "5rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--border-inverse)",
          textAlign: "center",
        }}
      >
        <Link
          href="/"
          aria-label="Propai home"
          style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink-inverse)",
              lineHeight: 1,
            }}
          >
            Prop
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: "var(--accent-soft)",
              lineHeight: 1,
            }}
          >
            ai
          </span>
        </Link>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.98rem",
            color: "rgba(243, 238, 229, 0.7)",
            maxWidth: 520,
            marginInline: "auto",
          }}
        >
          {t.footer.tagline}
        </p>
      </div>

      {/* Columns */}
      <div className="container" style={{ paddingTop: "3.5rem", paddingBottom: "3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "1.25rem",
                }}
              >
                {col.heading}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {col.links.map((l) => (
                  <li key={`${col.heading}-${l.label}-${l.href}`}>
                    <Link
                      href={l.href}
                      style={{
                        color: "rgba(243, 238, 229, 0.78)",
                        fontSize: "0.92rem",
                        fontWeight: 400,
                        textDecoration: "none",
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border-inverse)",
        }}
      >
        <div
          className="container"
          style={{
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 10,
              color: "rgba(243, 238, 229, 0.5)",
              margin: 0,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {t.footer.rights}
          </p>
          <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
            <Link
              href="/about"
              style={{
                fontSize: 10,
                color: "rgba(243, 238, 229, 0.72)",
                textDecoration: "none",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              style={{
                fontSize: 10,
                color: "rgba(243, 238, 229, 0.72)",
                textDecoration: "none",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {t.nav.contact}
            </Link>
            <span
              style={{
                fontSize: 10,
                color: "rgba(243, 238, 229, 0.5)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {lang === "EN" ? "Dubai · UAE" : "دبي · الإمارات"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
