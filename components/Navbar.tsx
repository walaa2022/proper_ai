"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleLang = () => setLang(lang === 'EN' ? 'AR' : 'EN');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/sale', label: t.nav.sale },
    { href: '/rental', label: t.nav.rental },
    { href: '/brokerage', label: t.nav.brokerage },
    { href: '/business', label: t.nav.business },
    { href: '/contact', label: t.nav.contact },
    { href: '/about', label: t.nav.about },
  ];

  return (
    <>
      <nav
        aria-label="Main"
        style={{
          position: 'fixed',
          top: 0,
          insetInlineStart: 0,
          width: '100%',
          zIndex: 1000,
          padding: scrolled ? '14px 0' : '22px 0',
          background: scrolled ? 'rgba(247, 243, 236, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
          transition: 'var(--transition)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            position: 'relative',
          }}
        >
          {/* Left: wordmark */}
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2 }}
            aria-label="Propai home"
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '1.6rem',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                lineHeight: 1,
              }}
            >
              Prop
            </span>
            <span
              className="italic-accent"
              style={{ fontSize: '1.6rem', lineHeight: 1 }}
            >
              ai
            </span>
          </Link>

          {/* Center: editorial nav (desktop) */}
          <div
            className="hidden-md"
            style={{
              display: 'flex',
              gap: 30,
              alignItems: 'center',
              position: 'absolute',
              insetInlineStart: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: lang + CTA */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <button
              onClick={toggleLang}
              aria-label={t.nav.switchLanguage}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--ink)',
                padding: 0,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {lang === 'EN' ? 'عربي' : 'EN'}
            </button>

            <div className="hidden-sm" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <span aria-hidden style={{ width: 1, height: 18, background: 'var(--border)' }} />
              <Link
                href="/login"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                }}
              >
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className="btn-primary"
                style={{ padding: '12px 22px', minHeight: 42, fontSize: 10 }}
              >
                {t.nav.getStarted}
              </Link>
            </div>

            <button
              className="show-sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t.nav.toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              style={{
                background: 'transparent',
                border: 'none',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink)',
                cursor: 'pointer',
                zIndex: 3000,
              }}
            >
              {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} aria-hidden={!isOpen}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="hr-thin" style={{ margin: '1rem 0' }} />
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: 12,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              fontWeight: 500,
            }}
          >
            {t.nav.login}
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            {t.nav.getStarted}
          </Link>
        </div>
      </div>
    </>
  );
}
