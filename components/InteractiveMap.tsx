"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet (SSR fix)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function InteractiveMap({ properties }: { properties: any[] }) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    import('leaflet').then((leaflet) => {
      setL(leaflet);
      // Fix for default marker icons in Leaflet + Next.js
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  if (!isClient || !L) return <div style={{ height: '500px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Initialising Global Intelligence Map...</div>;

  return (
    <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--charcoal)', marginBottom: '15px' }}>
            Interactive <span className="gold-text">Market</span> Layout
          </h2>
          <p style={{ opacity: 0.7 }}>Browse elite properties across Dubai's most high-yield geographical zones.</p>
        </div>
        
        <div style={{ height: '500px', width: '100%', borderRadius: '4px', overflow: 'hidden', border: '8px solid #FFFFFF', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
          <MapContainer center={[25.1972, 55.2744]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {properties.filter(p => p.lat && p.lng).map(property => (
              <Marker key={property.id} position={[property.lat, property.lng]}>
                <Popup>
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, color: 'var(--charcoal)' }}>{property.location}</div>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 900, marginTop: '5px' }}>{property.price}</div>
                    <a href={`/properties/${property.id}`} style={{ fontSize: '10px', textTransform: 'uppercase', color: 'blue', marginTop: '10px', display: 'block' }}>View Asset</a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
