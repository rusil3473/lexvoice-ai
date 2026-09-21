import React from 'react';
import { Scale, ShieldCheck, Cpu, Globe, Mic } from 'lucide-react';

interface HeaderProps {
  sovereignMode: boolean;
  setSovereignMode: (val: boolean) => void;
  marketMode: string;
  setMarketMode: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  sovereignMode,
  setSovereignMode,
  marketMode,
  setMarketMode
}) => {
  return (
    <header className="glass-panel" style={{ padding: '18px 28px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, hsl(239, 84%, 67%), hsl(280, 80%, 60%))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px hsla(239, 84%, 67%, 0.4)'
          }}>
            <Scale size={26} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>LexVoice AI</h1>
              <span className="badge badge-primary">LexHack 2026</span>
              <span className="badge badge-success">
                <Mic size={12} /> AssemblyAI Streaming
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
              Autonomous Cross-Border Contract Protection • DPDP Act 2023 • Cryptographic Milestone Escrow
            </p>
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Market Mode Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'hsla(222, 30%, 15%, 0.8)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <Globe size={16} color="var(--primary)" />
            <select
              value={marketMode}
              onChange={(e) => setMarketMode(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="US-India" style={{ background: '#0f172a' }}>US ↔ India Cross-Border</option>
              <option value="US-Domestic" style={{ background: '#0f172a' }}>US Domestic (FTC / Delaware)</option>
              <option value="India-Domestic" style={{ background: '#0f172a' }}>India Domestic (DPDP Act 2023)</option>
            </select>
          </div>

          {/* Swiss Apertus Sovereign Mode */}
          <button
            onClick={() => setSovereignMode(!sovereignMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              border: sovereignMode ? '1px solid var(--success)' : '1px solid var(--border-subtle)',
              background: sovereignMode ? 'hsla(158, 64%, 52%, 0.15)' : 'hsla(222, 30%, 15%, 0.8)',
              color: sovereignMode ? 'var(--success)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Cpu size={16} />
            <span>Apertus 1.5 Sovereign LLM</span>
            {sovereignMode && <ShieldCheck size={16} color="var(--success)" />}
          </button>

        </div>

      </div>
    </header>
  );
};
