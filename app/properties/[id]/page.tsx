import { Metadata, ResolvingMetadata } from 'next';
import db from '@/lib/db';
import Navbar from '@/components/Navbar';
import { Home, MapPin, DollarSign, Layout, PieChart } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

// AUTOMATED SEO ENGINE
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const { data: property } = await db.from('Properties_Inventory').select('*').eq('id', id).single();

  if (!property) return { title: 'Property Not Found | PROP_AI' };

  return {
    title: `${property.location} - ${property.transaction_type} for ${property.price} | PROP_AI`,
    description: `Investment Opportunity: Premium property in ${property.location}. ${property.rooms} rooms, ROI Estimate of ${property.roi_estimate}. Managed by AI Broker.`,
    keywords: [`real estate ${property.location}`, property.transaction_type, property.price, 'luxury property'],
    openGraph: {
      title: `PROP_AI Exclusive: ${property.location}`,
      description: `Don't miss this ${property.transaction_type} in ${property.location} for ${property.price}.`,
      images: [property.images || '/prop1.jpg'],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const id = (await params).id;
  const { data: property } = await db.from('Properties_Inventory').select('*').eq('id', id).single();

  if (!property) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Property Not Found</h1>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--deep-navy)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '160px 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '3rem' }}>
          
          {/* Main Visual Section */}
          <div>
            <div className="glass" style={{ 
              width: '100%', 
              height: '500px', 
              background: 'var(--navy-lighter)', 
              borderRadius: '24px', 
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--accent-gold)'
            }}>
              <Layout size={64} /> [Image Placeholder: {property.location}]
            </div>

            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="gold-text">
              {property.location}
            </h1>
            
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="var(--accent-gold)" /> {property.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home size={20} color="var(--accent-gold)" /> {property.rooms} Rooms
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChart size={20} color="var(--accent-gold)" /> ROI: {property.roi_estimate}
              </div>
            </div>

            <div style={{ lineHeight: '1.8', fontSize: '1.1rem', opacity: 0.9 }}>
              <p>Experience ultra-luxury living with this premium {property.transaction_type} opportunity. Our AI Matching engine has flagged this as a high-value asset based on current market trends and geolocation data.</p>
              <br />
              <p>Key Features: Smart-Home Integration, Panoramic views of the city skyline, Private elevator access, High-speed connectivity, and AI-optimized energy management systems.</p>
            </div>
          </div>

          {/* Sidebar / CTA */}
          <aside style={{ height: 'fit-content', position: 'sticky', top: '160px' }}>
            <div className="glass" style={{ padding: '30px', borderTop: '4px solid var(--accent-gold)' }}>
              <span style={{ fontSize: '14px', textTransform: 'uppercase', opacity: 0.6 }}>Listed Price</span>
              <h2 style={{ fontSize: '2.5rem', margin: '10px 0 30px' }} className="gold-text">{property.price}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn-primary" style={{ width: '100%', padding: '16px' }}>
                  Contact Agent
                </button>
                <button className="btn-secondary" style={{ width: '100%', padding: '16px' }}>
                  Download Brochure
                </button>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', fontSize: '13px', opacity: 0.5 }}>
                Status: {property.status}<br />
                ID: PROP-{property.id.toString().padStart(5, '0')}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
