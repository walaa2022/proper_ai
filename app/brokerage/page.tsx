"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { Briefcase, TrendingUp, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BrokeragePage() {
  const { lang, t } = useLanguage();

  const services = [
    {
      title: lang === 'EN' ? "Commercial Brokerage" : "الوساطة التجارية",
      desc: lang === 'EN' ? "Expert negotiation and acquisition of prime office, retail, and hospitality spaces in Dubai." : "التفاوض والتحصيل الخبير للمساحات المكتبية والتجزئة والضيافة المتميزة في دبي.",
      icon: <Briefcase size={32} />
    },
    {
      title: lang === 'EN' ? "Portfolio Arbitrage" : "مراجحة المحفظة",
      desc: lang === 'EN' ? "AI-driven identification of undervalued assets for rapid capital growth and high-yield turnover." : "تحديد الأصول المقومة بأقل من قيمتها الحقيقية بالاعتماد على الذكاء الاصطناعي لنمو رأس المال السريع.",
      icon: <TrendingUp size={32} />
    },
    {
      title: lang === 'EN' ? "Legal Compliance" : "الامتثال القانوني",
      desc: lang === 'EN' ? "Full spectrum regulatory support ensuring all transactions adhere to local RERA and DLD standards." : "دعم تنظيمي كامل يضمن التزام جميع المعاملات بمعايير ريرا ودائرة الأراضي والأملاك.",
      icon: <ShieldCheck size={32} />
    },
    {
      title: lang === 'EN' ? "Joint Ventures" : "المشاريع المشتركة",
      desc: lang === 'EN' ? "Coordinating complex multi-party investment deals for institutional and private equity clients." : "تنسيق صفقات الاستثمار المعقدة متعددة الأطراف لعملاء الأسهم الخاصة والمؤسسات.",
      icon: <Users size={32} />
    }
  ];

  return (
    <div style={{ background: 'var(--deep-luxury)', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ paddingTop: 'clamp(100px, 15vh, 160px)' }}>
        <section className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, color: 'var(--charcoal)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              {lang === 'EN' ? "Institutional" : "الوساطة"} <span className="gold-text">{lang === 'EN' ? "Brokerage" : "المؤسسية"}</span>
            </h1>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.8, color: 'var(--charcoal)', lineHeight: '1.8' }}>
              {lang === 'EN' 
                ? "PROP_AI facilitates the world's most complex real estate transactions through a fusion of human expertise and machine intelligence."
                : "تسهل بروب_أي المعاملات العقارية الأكثر تعقيداً في العالم من خلال دمج الخبرة البشرية والذكاء الاصطناعي."}
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            marginBottom: '60px'
          }}>
            {services.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="glass"
                style={{ padding: '60px 40px', background: '#FFFFFF', textAlign: lang === 'AR' ? 'right' : 'left' }}
              >
                <div style={{ color: 'var(--accent-gold)', marginBottom: '30px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '20px' }}>{item.title}</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.7', color: 'var(--charcoal)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ 
            background: 'var(--charcoal)', 
            padding: 'clamp(40px, 10vw, 80px)', 
            borderRadius: '4px', 
            color: '#FFFFFF', 
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              {lang === 'EN' ? "Initiate Your Transaction" : "ابدأ معاملتك الآن"}
            </h2>
            <p style={{ marginBottom: '40px', opacity: 0.8, fontSize: '1.1rem' }}>
              {lang === 'EN' 
                ? "Our elite brokerage desk is active. Connect with an advisor to streamline your acquisition."
                : "مكتب الوساطة المتميز لدينا نشط الآن. تواصل مع مستشار لتسهيل عملية الاستحواذ الخاصة بك."}
            </p>
            <button className="btn-primary" style={{ background: 'var(--accent-gold)', border: 'none', display: 'flex', alignItems: 'center', gap: '15px', margin: '0 auto' }}>
              {lang === 'EN' ? "Contact Desk" : "تواصل مع المكتب"} <ArrowRight size={20} />
            </button>
          </div>
        </section>
      </main>

      <footer style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', background: '#080808' }}>
        <p style={{ opacity: 0.9, fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>© 2026 PROP_AI ELITE GROUP • ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
