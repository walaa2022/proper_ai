"use client";
import Link from "next/link";
import { ArrowUpRight, MapPin, Bed, Bath, Layout } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Property {
  id: number;
  location: string;
  transaction_type: string;
  price: string;
  rooms: number;
}

export default function PropertyGrid({ properties }: { properties: Property[] }) {
  const { lang, t } = useLanguage();

  // Curated Luxury Villa Images for the Showroom
  const villaImages = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  ];

  return (
    <div className="property-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    }}>
      {properties.map((p, idx) => (
        <Link 
          key={p.id} 
          href={`/properties/${p.id}`} 
          className="glass" 
          style={{ 
            padding: '16px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem',
            transition: 'var(--transition)',
            cursor: 'pointer',
            textAlign: lang === 'AR' ? 'right' : 'left',
            background: '#FFFFFF',
            border: '1.5px solid var(--accent-gold)' /* Elegant Gold Border */
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.borderColor = 'var(--accent-gold)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(23, 37, 84, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
          }}
        >
          <div style={{ 
            width: '100%', 
            height: '220px',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(23, 37, 84, 0.05)'
          }}>
            {/* REAL LUXURY IMAGE */}
            <img 
              src={villaImages[idx % villaImages.length]} 
              alt={p.location}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />

            <div style={{ 
              position: 'absolute', 
              top: '12px', 
              left: lang === 'EN' ? '12px' : 'auto', 
              right: lang === 'AR' ? '12px' : 'auto',
              background: 'var(--accent-gold)', 
              padding: '6px 16px', 
              borderRadius: '2px',
              fontSize: '9px',
              fontWeight: 900,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              zIndex: 2
            }}>
              {p.transaction_type.toUpperCase() === 'SALE' ? t.featured.sale : t.featured.rental}
            </div>
            
            {/* Overlay Gradient for contrast */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2) 100%)',
              zIndex: 1
            }} />
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--charcoal)' }}>{p.location.split(',')[0]}</h4>
              <ArrowUpRight size={22} color="var(--accent-gold)" style={{ transform: lang === 'AR' ? 'scaleX(-1)' : 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8, fontSize: '12px', fontWeight: 700, color: 'var(--charcoal)' }}>
              <MapPin size={15} color="var(--accent-gold)" /> {p.location}
            </div>
            
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: 'var(--charcoal)' }}>
                <Bed size={15} color="var(--accent-gold)" /> {p.rooms} {t.featured.beds}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--charcoal)' }}>
                <Bath size={15} color="var(--accent-gold)" /> 2 {t.featured.baths}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--charcoal)' }}>
                <Layout size={15} color="var(--accent-gold)" /> 2,450 {t.featured.sqft}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(23, 37, 84, 0.1)', paddingTop: '1.25rem', flexDirection: lang === 'AR' ? 'row-reverse' : 'row' }}>
              <div style={{ textAlign: lang === 'AR' ? 'right' : 'left' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 800, letterSpacing: '1.5px', display: 'block', marginBottom: '5px', color: 'var(--charcoal)' }}>
                  {t.featured.assetValuation}
                </span>
                <span className="gold-text" style={{ fontSize: '1.4rem', fontWeight: 900 }}>{p.price}</span>
              </div>
              <button className="btn-secondary" style={{ padding: '6px 18px', fontSize: '9px', letterSpacing: '1px' }}>
                {t.featured.fullDetails}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
