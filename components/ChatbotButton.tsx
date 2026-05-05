"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Loader2, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

// Generate a session ID once per browser tab so n8n can maintain conversation memory
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let id = sessionStorage.getItem('propai_session');
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('propai_session', id);
  }
  return id;
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { lang, t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([
      {
        role: 'bot',
        content:
          lang === 'EN'
            ? "Welcome to PROP_AI. I am your digital luxury broker. How can I assist you with Dubai's elite market?"
            : "مرحباً بك في بروب_أي. أنا وسيطك الرقمي المتخصص. كيف يمكنني مساعدتك في سوق دبي العقاري الفاخر اليوم؟",
      },
    ]);
  }, [lang]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = inputText.trim();
    setInputText("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          lang,
          sessionId: getSessionId(),
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content:
            lang === 'AR'
              ? 'نعتذر، حدث خطأ. يرجى المحاولة مرة أخرى.'
              : "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '110px',
          right: '30px',
          zIndex: 5000,
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, var(--accent-gold) 0%, #B8860B 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(184, 150, 12, 0.4)',
          cursor: 'pointer',
          border: '4px solid #FFFFFF',
          color: '#FFFFFF'
        }}
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}

        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxShadow: '0 0 25px var(--accent-gold)',
            zIndex: -1
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: 'calc(100% - 40px)',
              maxWidth: '400px',
              height: 'calc(100% - 40px)',
              maxHeight: '600px',
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              zIndex: 6001,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(184, 150, 12, 0.2)'
            }}
          >
            {/* Header */}
            <div style={{ background: '#080808', padding: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'var(--accent-gold)', padding: '10px', borderRadius: '4px' }}>
                <Sparkles size={20} color="#FFF" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#FFF', fontWeight: 900, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {lang === 'EN' ? 'PROP_AI Elite Bot' : 'بوت بروب_أي الذكي'}
                </div>
                <div style={{ color: 'var(--accent-gold)', fontSize: '11px', fontWeight: 800 }}>Available • 24/7 Concierge</div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', opacity: 0.5 }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '25px', overflowY: 'auto', background: '#F8F9FA', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: m.role === 'bot' ? 'var(--accent-gold)' : '#080808',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {m.role === 'bot' ? <Bot size={14} color="#FFF" /> : <User size={14} color="#FFF" />}
                  </div>
                  <div style={{
                    background: m.role === 'user' ? '#080808' : '#FFF',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    fontSize: '13px',
                    color: m.role === 'user' ? '#FFF' : '#333',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    border: m.role === 'bot' ? '1px solid #EEE' : 'none'
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', opacity: 0.5 }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader2 size={14} className="animate-spin" color="#FFF" />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700 }}>AI is analyzing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid #EEE', display: 'flex', gap: '15px' }}>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={lang === 'EN' ? "Type your inquiry..." : "اكتب استفسارك هنا..."}
                disabled={isTyping}
                style={{ flex: 1, padding: '12px 20px', borderRadius: '4px', border: '1px solid #EEE', fontSize: '14px', color: '#000', outline: 'none', opacity: isTyping ? 0.6 : 1 }}
              />
              <button
                type="submit"
                disabled={isTyping}
                style={{ background: 'var(--accent-gold)', border: 'none', padding: '12px', borderRadius: '4px', color: '#FFF', cursor: isTyping ? 'not-allowed' : 'pointer', opacity: isTyping ? 0.6 : 1 }}
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
