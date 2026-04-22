"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedSection({ properties }: { properties: any[] }) {
  const { lang, t } = useLanguage();

  return (
    <section style={{ 
      background: 'linear-gradient(180deg, rgba(6, 78, 59, 0.02) 0%, rgba(255, 255, 255, 0.5) 100%)', 
      padding: '80px 0',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      borderBottom: '1px solid rgba(6, 78, 59, 0.05)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
              <Star size={24} fill="currentColor" />
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>{t.featured.series}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, marginBottom: '15px', color: 'var(--charcoal)' }}>
              {t.featured.investments} <span className="gold-text">{t.featured.exclusive}</span>
            </h2>
            <p style={{ maxWidth: '600px', fontSize: '1rem', opacity: 0.7, lineHeight: '1.7', color: 'var(--charcoal)' }}>
              {t.featured.desc}
            </p>
          </div>
          <Link href="/sale" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 32px', textDecoration: 'none', fontSize: '11px' }}>
             {t.featured.allCollections} <ArrowRight size={18} />
          </Link>
        </div>

        <PropertyGrid properties={properties || []} />
      </div>
    </section>
  );
}
