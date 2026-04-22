"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

export default function Hero() {
  const { lang, t } = useLanguage();

  const slides = [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop",
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      aria-labelledby="hero-title"
      style={{
        position: 'relative',
        minHeight: 'clamp(620px, 92vh, 860px)',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: 'var(--ink-inverse)',
      }}
    >
      {/* Full-bleed slideshow */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current]}
            alt={
              lang === 'EN'
                ? `Featured property ${current + 1} of ${slides.length}`
                : `عقار مختار ${current + 1} من ${slides.length}`
            }
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
          />
        </AnimatePresence>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(26,22,19,0.55) 0%, rgba(26,22,19,0.28) 40%, rgba(26,22,19,0.78) 100%)',
          }}
        />
      </div>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'clamp(140px, 22vh, 220px)',
          paddingBottom: 'clamp(60px, 10vh, 120px)',
        }}
      >
        <div style={{ maxWidth: 820 }}>
          <div
            className="eyebrow"
            style={{
              color: 'var(--accent-soft)',
              marginBottom: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span aria-hidden style={{ width: 40, height: 1, background: 'var(--accent)' }} />
            <span>{t.hero.marketIntel}</span>
          </div>

          <h1
            id="hero-title"
            style={{
              color: 'var(--ink-inverse)',
              marginBottom: '1.25rem',
              fontSize: 'clamp(2.8rem, 7vw, 5.4rem)',
              lineHeight: 1.02,
              fontWeight: 400,
            }}
          >
            <span style={{ display: 'block' }}>{t.hero.headline}</span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--accent-soft)',
                fontWeight: 400,
              }}
            >
              {t.hero.subHeadline}
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.65,
              color: 'rgba(243, 238, 229, 0.82)',
              marginBottom: '2.25rem',
              maxWidth: 600,
            }}
          >
            {t.hero.desc}
          </p>

          <div style={{ marginBottom: '1.75rem' }}>
            <SearchBar />
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/business"
              className="btn-secondary"
              aria-label={t.hero.ctaSecondary}
              style={{
                borderColor: 'var(--ink-inverse)',
                color: 'var(--ink-inverse)',
                background: 'transparent',
              }}
            >
              {t.hero.ctaSecondary}
            </Link>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(243, 238, 229, 0.68)',
                fontWeight: 500,
              }}
            >
              <span aria-hidden style={{ width: 28, height: 1, background: 'var(--accent)' }} />
              <span>{t.hero.verified}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 32,
          insetInlineEnd: 32,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 10,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(243, 238, 229, 0.72)',
          fontWeight: 500,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--accent-soft)',
            textTransform: 'none',
            letterSpacing: 0,
          }}
        >
          {String(current + 1).padStart(2, '0')}
        </span>
        <span aria-hidden style={{ width: 56, height: 1, background: 'var(--accent)' }} />
        <span>
          {String(slides.length).padStart(2, '0')} · {lang === 'EN' ? 'Curated homes' : 'منازل مختارة'}
        </span>
      </div>
    </section>
  );
}
