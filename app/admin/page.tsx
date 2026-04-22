"use client";
import React, { useState, useEffect } from "react";
import { Plus, User, Phone, Mail, Home, MessageCircle, BarChart3, TrendingUp, LogOut, Shield, MapPin, DollarSign, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [props, setProps] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    transaction_type: 'Sale',
    price: '',
    location: '',
    rooms: 2,
    roi: '10%',
    lat: 25.1972,
    lng: 55.2744
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setSession(session);
        fetchLeads();
        fetchProps();

        // REAL-TIME SUBSCRIPTION
        const channel = supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'leads_master' },
            (payload) => {
              setLeads(prev => [payload.new, ...prev]);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const fetchLeads = async () => {
    try {
      const resp = await fetch('/api/leads');
      const data = await resp.json();
      if (Array.isArray(data)) setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProps = async () => {
    try {
      const resp = await fetch('/api/properties');
      const data = await resp.json();
      if (Array.isArray(data)) setProps(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (resp.ok) {
        fetchProps();
        setFormData({ transaction_type: 'Sale', price: '', location: '', rooms: 2, roi: '10%', lat: 25.1972, lng: 55.2744 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#080808', color: '#FFFFFF' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ 
        width: '300px', 
        background: '#FFFFFF', 
        borderRight: '1px solid rgba(184, 150, 12, 0.2)', 
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--accent-gold)', padding: '8px', borderRadius: '4px' }}>
            <Shield size={24} color="#FFFFFF" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#080808' }}>ADMIN PORTAL</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('leads')}
            style={{ 
              background: activeTab === 'leads' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'leads' ? '#FFF' : '#333333',
              padding: '14px 20px', borderRadius: '4px', border: 'none', textAlign: 'left', fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: '0.2s',
              opacity: activeTab === 'leads' ? 1 : 0.6
            }}
          >
            <User size={18} /> Leads Master
          </button>
          <button 
            onClick={() => setActiveTab('properties')}
            style={{ 
              background: activeTab === 'properties' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'properties' ? '#FFF' : '#333333',
              padding: '14px 20px', borderRadius: '4px', border: 'none', textAlign: 'left', fontWeight: 800,
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: '0.2s',
              opacity: activeTab === 'properties' ? 1 : 0.6
            }}
          >
            <Home size={18} /> Inventory
          </button>
          
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <button 
              onClick={handleLogout}
              style={{ 
                width: '100%',
                background: 'rgba(255, 65, 54, 0.05)',
                color: '#FF4136',
                padding: '14px 20px', borderRadius: '4px', border: '1px solid rgba(255, 65, 54, 0.2)', textAlign: 'left', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}
            >
              <LogOut size={18} /> Authorized Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ flex: 1, padding: '60px 80px' }}>
        <header className="admin-header" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '10px', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              {activeTab === 'leads' ? 'Leads Performance' : 'Inventory Management'}
            </h1>
            <p style={{ opacity: 0.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '11px' }}>
              Real-time synchronization with PROP_AI Cloud.
            </p>
          </div>
          <div className="glass admin-stat-box" style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184, 150, 12, 0.3)' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, marginBottom: '5px' }}>Active Leads</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent-gold)' }}>{leads.length}</div>
            </div>
            <TrendingUp size={32} color="var(--accent-gold)" />
          </div>
        </header>

        {activeTab === 'leads' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {leads.map(lead => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={lead.id} 
                className="glass admin-card" 
                style={{ 
                  padding: '40px', 
                  display: 'grid', 
                  gridTemplateColumns: '1.2fr 1fr 150px 150px', 
                  alignItems: 'center',
                  background: '#FFFFFF',
                  borderRadius: '2px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1.35rem', color: '#080808', marginBottom: '5px' }}>{lead.name}</div>
                  <div style={{ fontSize: '13px', color: '#666666', fontWeight: 700 }}>{lead.email} • {lead.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 900, letterSpacing: '1.5px', marginBottom: '8px' }}>Requirement Pattern</div>
                  <div style={{ fontWeight: 800, color: '#333333', fontSize: '1.1rem' }}>{lead.intent} in {lead.location}</div>
                  <div style={{ fontSize: '15px', color: 'var(--accent-gold)', fontWeight: 900, marginTop: '4px' }}>{lead.budget}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ 
                    padding: '8px 24px', 
                    borderRadius: '2px', 
                    fontSize: '11px', 
                    fontWeight: 900,
                    background: lead.lead_score === 'HOT' ? '#FF4136' : lead.lead_score === 'WARM' ? 'var(--accent-gold)' : '#0074D9',
                    color: '#FFF',
                    letterSpacing: '2px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}>
                    {lead.lead_score}
                  </span>
                </div>
                <div className="admin-card-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button style={{ background: '#F8F9FA', border: '1px solid #EEE', padding: '12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--accent-gold)', transition: '0.2s' }}>
                    <MessageCircle size={22} />
                  </button>
                  <button style={{ background: 'var(--accent-gold)', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', color: '#FFF', transition: '0.2s' }}>
                    <Phone size={22} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {props.map(p => (
                <div key={p.id} className="glass" style={{ padding: '30px', display: 'flex', gap: '30px', background: '#FFFFFF', alignItems: 'center', borderRadius: '2px' }}>
                  <div style={{ width: '100px', height: '100px', background: '#F8F9FA', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EEE' }}>
                    <Home size={32} color="var(--accent-gold)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, color: '#080808', fontSize: '1.35rem' }}>{p.location}</div>
                    <div style={{ fontSize: '14px', color: '#666', fontWeight: 700, marginTop: '5px' }}>{p.rooms} Rooms • {p.transaction_type} • Prime Asset</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Valuation</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#080808' }}>{p.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass" style={{ padding: '40px', height: 'fit-content', background: '#FFFFFF', borderTop: '6px solid var(--accent-gold)', borderRadius: '2px' }}>
              <h3 style={{ marginBottom: '30px', fontWeight: 900, fontSize: '1.75rem', color: '#080808', fontFamily: 'var(--font-heading)' }}>Deploy Asset</h3>
              <form onSubmit={handleAddProperty} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Transaction Unit</label>
                  <select 
                    value={formData.transaction_type}
                    onChange={e => setFormData({...formData, transaction_type: e.target.value})}
                    style={{ padding: '15px', borderRadius: '4px', border: '1px solid #EEE', background: '#F8F9FA', fontWeight: 700, color: '#333' }}
                  >
                    <option>Sale</option>
                    <option>Rent</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Market Value</label>
                  <input 
                    placeholder="e.g. 5,000,000 AED" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    style={{ padding: '15px', borderRadius: '4px', border: '1px solid #EEE', background: '#F8F9FA', fontWeight: 700, color: '#333' }} 
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Latitude</label>
                    <input 
                      type="number" step="any"
                      value={formData.lat}
                      onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})}
                      style={{ padding: '15px', borderRadius: '4px', border: '1px solid #EEE', background: '#F8F9FA', fontWeight: 700, color: '#333' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Longitude</label>
                    <input 
                      type="number" step="any"
                      value={formData.lng}
                      onChange={e => setFormData({...formData, lng: parseFloat(e.target.value)})}
                      style={{ padding: '15px', borderRadius: '4px', border: '1px solid #EEE', background: '#F8F9FA', fontWeight: 700, color: '#333' }} 
                    />
                  </div>
                </div>
                <button className="btn-primary" type="submit" style={{ marginTop: '20px', padding: '20px' }}>Deploy to Platform</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
