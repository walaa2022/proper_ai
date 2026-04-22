"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, Loader2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '60px 40px',
          background: '#FFFFFF',
          borderTop: '8px solid var(--accent-gold)',
          borderRadius: '4px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--accent-gold)', padding: '15px', borderRadius: '4px' }}>
              <Shield size={40} color="#FFF" />
            </div>
          </div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 900, 
            marginBottom: '10px', 
            color: '#080808', 
            fontFamily: 'var(--font-heading)' 
          }}>
            Admin <span className="gold-text">Access</span>
          </h1>
          <p style={{ color: '#666', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            PROP_AI Secure Gateway Node
          </p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 65, 54, 0.05)', 
            border: '1px solid #FF4136', 
            color: '#FF4136', 
            padding: '15px', 
            borderRadius: '4px', 
            marginBottom: '2rem',
            fontSize: '14px',
            fontWeight: 700
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 900, letterSpacing: '2px' }}>
              Identification Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@propai.com"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  background: '#F8F9FA',
                  border: '1px solid #EEE',
                  color: '#080808',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 900, letterSpacing: '2px' }}>
              Security Cipher
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  background: '#F8F9FA',
                  border: '1px solid #EEE',
                  color: '#080808',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="btn-primary" 
            style={{ 
              marginTop: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '15px',
              padding: '20px',
              fontSize: '14px'
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <><LogIn size={24} /> Authorized Entrance</>}
          </button>
        </form>

        <div style={{ marginTop: '3rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '15px' }}>
          <span style={{ color: '#666', fontWeight: 600 }}>New Agent?</span>
          <Link href="/signup" style={{ color: 'var(--accent-gold)', fontWeight: 900 }}>Request Access</Link>
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid #EEE', paddingTop: '2.5rem' }}>
          <p style={{ fontSize: '11px', color: '#999', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px' }}>
            PROP_AI Distributed Network • 2026 
          </p>
        </div>
      </motion.div>
    </div>
  );
}
