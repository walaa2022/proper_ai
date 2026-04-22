"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIBroker() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to PROP_AI! I am your 24/7 AI Broker. Are you looking to Buy, Sell, Rent, or seeking Brokerage services?' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0); // 0: intent, 1: budget, 2: location, 3: timeline, 4: contact info, 5: done
  const [leadData, setLeadData] = useState({
    intent: '',
    budget: '',
    location: '',
    timeline: '',
    contact: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const nextStep = step + 1;
    setStep(nextStep);

    // Simulate AI thinking
    setTimeout(() => {
      let botResponse = "";
      const updatedData = { ...leadData };

      switch (step) {
        case 0:
          updatedData.intent = userMsg;
          botResponse = `Excellent choice for ${userMsg}. What is your approximate budget range? (e.g. $500k - $1M)`;
          break;
        case 1:
          updatedData.budget = userMsg;
          botResponse = "Understood. In which location are you looking for property?";
          break;
        case 2:
          updatedData.location = userMsg;
          botResponse = "Perfect. When are you looking to finalize your decision? (Immediately, 3 months, or just browsing?)";
          break;
        case 3:
          updatedData.timeline = userMsg;
          botResponse = "Got it. Finally, please provide your Phone or Email so our experts can contact you with matching listings.";
          break;
        case 4:
          updatedData.contact = userMsg;
          botResponse = "Thank you! I've analyzed your requirements. A human specialist will be in touch shortly with a HOT match for you. Goodbye!";
          // Here we would call API to store lead
          saveLead({ ...updatedData, contact: userMsg });
          break;
        default:
          botResponse = "Thanks again! Feel free to ask anything else about our properties.";
      }

      setLeadData(updatedData);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const saveLead = async (data: any) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.error("Failed to save lead", e);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            color: 'var(--deep-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
            cursor: 'pointer',
            border: 'none',
            zIndex: 4000
          }}
        >
          <MessageSquare size={28} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="glass"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '100%',
              maxWidth: '380px',
              height: 'calc(100% - 40px)',
              maxHeight: '600px',
              zIndex: 6001,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              borderBottom: '4px solid var(--accent-gold)',
              borderRadius: '12px'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              background: 'var(--navy-lighter)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--glass-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', background: '#4CAF50', borderRadius: '50%' }}></div>
                <h4 style={{ fontSize: '16px', fontWeight: 700 }}>AI BROKER <span className="gold-text">24/7</span></h4>
              </div>
              <X onClick={() => setIsOpen(false)} cursor="pointer" size={20} />
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.role === 'user' ? 'var(--accent-gold)' : 'var(--glass-bg)',
                  color: m.role === 'user' ? 'var(--deep-navy)' : 'var(--tech-white)',
                  padding: '12px 16px',
                  borderRadius: m.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', opacity: 0.6, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Loader2 size={14} className="animate-spin" /> AI Broker is thinking...
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{
                  flex: 1,
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--tech-white)',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                style={{
                  padding: '10px',
                  background: 'var(--accent-gold)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: 'var(--deep-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
