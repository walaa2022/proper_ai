"use client";
import React from "react";
import { Star, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Agent {
  id: number;
  name: string;
  phone: string;
  rating: number;
  image_url: string;
}

export default function Agents({ agents }: { agents: Agent[] }) {
  return (
    <section style={{ padding: '100px 0', background: '#FFFFFF' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
            <span style={{ height: '1px', width: '40px', background: 'var(--accent-gold)' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>Elite Advisors</span>
            <span style={{ height: '1px', width: '40px', background: 'var(--accent-gold)' }}></span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--charcoal)', marginBottom: '20px' }}>
            Meet Your <span className="gold-text">Personal</span> Brokers
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.7, color: 'var(--charcoal)' }}>
            Highly vetted specialists with a proven track record in ultra-luxury asset management and high-yield acquisitions.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '3rem' 
        }}>
          {agents.map((agent) => (
            <motion.div 
              key={agent.id}
              whileHover={{ y: -10 }}
              className="glass"
              style={{ padding: '30px', background: '#FFFFFF', textAlign: 'center', borderBottom: '6px solid var(--accent-gold)' }}
            >
              <div style={{ 
                width: '140px', 
                height: '140px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                margin: '0 auto 2rem',
                border: '4px solid #F8F9FA',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <img src={agent.image_url} alt={agent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '10px' }}>{agent.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>
                <Star size={16} fill="currentColor" />
                <span style={{ fontWeight: 900, fontSize: '14px' }}>{agent.rating.toFixed(1)}</span>
                <span style={{ fontSize: '12px', opacity: 0.5, marginLeft: '5px' }}>Top Rated Agent</span>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <a href={`tel:${agent.phone}`} style={{ 
                  background: 'var(--charcoal)', 
                  color: '#FFFFFF', 
                  padding: '12px 25px', 
                  borderRadius: '2px', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px' 
                }}>
                  <Phone size={14} /> Contact
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
