"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BusinessTypes from "@/components/BusinessTypes";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, LineChart, Workflow, MessagesSquare } from "lucide-react";

export default function BusinessPage() {
  const { lang, t } = useLanguage();

  const pillars = [
    {
      icon: Workflow,
      title: lang === "EN" ? "Unified intake" : "استقبال موحد",
      desc:
        lang === "EN"
          ? "Capture every lead from website, WhatsApp, Facebook, Google Ads and more into one queue — nothing gets lost."
          : "استقبل كل العملاء من الموقع، واتساب، فيسبوك، وإعلانات جوجل وغيرها في قائمة واحدة — دون فقد أي عميل.",
    },
    {
      icon: MessagesSquare,
      title: lang === "EN" ? "AI-assisted follow-ups" : "متابعات مدعومة بالذكاء",
      desc:
        lang === "EN"
          ? "Qualify, reply, and route leads to the right agent automatically. Humans still take over whenever you want."
          : "تأهيل العملاء والرد عليهم وتوجيههم للوكيل المناسب تلقائياً. تبقى الإدارة البشرية متاحة دائماً.",
    },
    {
      icon: LineChart,
      title: lang === "EN" ? "Operational KPIs" : "مؤشرات تشغيلية",
      desc:
        lang === "EN"
          ? "Daily KPIs for sales, rentals, occupancy, and conversion — for agents, teams, and the whole company."
          : "مؤشرات يومية للمبيعات والإيجار ونسبة الإشغال والتحويل — للوكلاء والفرق والشركة ككل.",
    },
    {
      icon: ShieldCheck,
      title: lang === "EN" ? "Secure & compliant" : "آمن ومتوافق",
      desc:
        lang === "EN"
          ? "Role-based access, audit trails, and regional compliance built-in."
          : "صلاحيات حسب الدور، سجلات تدقيق، وامتثال إقليمي مدمج.",
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <Navbar />

      {/* Hero */}
      <section
        aria-labelledby="biz-hero"
        style={{
          paddingTop: "clamp(120px, 16vh, 180px)",
          paddingBottom: "60px",
          background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
        }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--accent-gold)",
              marginBottom: "1rem",
            }}
          >
            {t.nav.business}
          </div>
          <h1
            id="biz-hero"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.2,
              fontWeight: 900,
              color: "var(--charcoal)",
              maxWidth: "820px",
              marginBottom: "1.25rem",
            }}
          >
            {t.business.heading}
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--charcoal)",
              opacity: 0.8,
              maxWidth: "720px",
              marginBottom: "2rem",
            }}
          >
            {t.business.desc}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              {t.business.cta}
            </Link>
            <Link href="/" className="btn-secondary">
              {lang === "EN" ? "I'm looking for a property" : "أبحث عن عقار"}
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section
        aria-labelledby="biz-pillars"
        className="container"
        style={{ paddingTop: "60px", paddingBottom: "20px" }}
      >
        <h2
          id="biz-pillars"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 900,
            color: "var(--charcoal)",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          {lang === "EN"
            ? "What you get out of the box"
            : "ما تحصل عليه من البداية"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass"
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.85)",
                borderInlineStart: "3px solid var(--accent-gold)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "4px",
                  background: "rgba(23,37,84,0.06)",
                  color: "var(--charcoal)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <Icon size={22} aria-hidden />
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "var(--charcoal)",
                  marginBottom: "0.5rem",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  opacity: 0.78,
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                  color: "var(--charcoal)",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BusinessTypes variant="page" />

      {/* Final CTA */}
      <section className="container" style={{ paddingTop: "20px", paddingBottom: "80px" }}>
        <div
          className="glass"
          style={{
            padding: "clamp(2rem, 4vw, 3rem)",
            textAlign: "center",
            background: "var(--charcoal)",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            {lang === "EN"
              ? "Run your real estate business smarter."
              : "أدر نشاطك العقاري بذكاء."}
          </h2>
          <p style={{ opacity: 0.85, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            {lang === "EN"
              ? "Talk to us about your team, your pipeline, and where PROP_AI fits in."
              : "تحدث معنا عن فريقك، عن خط أنابيب العملاء، وكيف تلائم PROP_AI نشاطك."}
          </p>
          <Link
            href="/contact"
            className="btn-primary"
            style={{ background: "var(--accent-gold)", color: "#fff" }}
          >
            {t.business.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
