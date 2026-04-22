import Navbar from "@/components/Navbar";
import PropertyGrid from "@/components/PropertyGrid";
import db from "@/lib/db";
import { Star } from "lucide-react";

export default async function SalePage() {
  // Fetch only 'Sale' properties from Supabase
  const { data: properties } = await db
    .from('properties_inventory')
    .select('*')
    .ilike('transaction_type', 'Sale');

  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: '#FFFFFF' }}>
      <Navbar />
      
      <section style={{ 
        padding: 'clamp(120px, 20vh, 180px) 0 clamp(60px, 10vh, 100px)', 
        background: 'linear-gradient(180deg, rgba(184, 150, 12, 0.05) 0%, #080808 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            <Star size={18} fill="currentColor" />
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>Prime Acquisition</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}>Properties for <span className="gold-text">Sale</span></h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.6, lineHeight: '1.8' }}>
            Explore an elite collection of ultra-luxury assets across Dubai's most prestigious districts. AI-vetted for high capital appreciation.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 160px' }}>
        <div className="container">
          <PropertyGrid properties={properties || []} />
        </div>
      </section>

      <footer style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', background: '#080808' }}>
        <p style={{ opacity: 0.9, fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>© 2026 PROP_AI ELITE GROUP • ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
