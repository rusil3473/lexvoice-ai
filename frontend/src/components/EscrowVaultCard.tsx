import React, { useState } from 'react';
import { Lock, Unlock, CheckCircle2, ShieldCheck, DollarSign, Key, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Milestone {
  milestone_id: string;
  project_name: string;
  milestone_title: string;
  amount_usd: number;
  developer_email: string;
  client_email: string;
  deliverable_summary: string;
  sha256_commitment: string;
  status: string;
  ip_released: boolean;
  release_tx?: string;
}

interface EscrowVaultProps {
  milestone: Milestone;
  onFundMilestone: (id: string) => void;
  onReleaseMilestone: (id: string) => void;
}

export const EscrowVaultCard: React.FC<EscrowVaultProps> = ({
  milestone,
  onFundMilestone,
  onReleaseMilestone
}) => {
  const [isSigning, setIsSigning] = useState(false);

  const handleReleaseWithCelebration = (id: string) => {
    setIsSigning(true);
    setTimeout(() => {
      onReleaseMilestone(id);
      setIsSigning(false);
      // Fire confetti burst!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const isLocked = milestone.status === 'LOCKED';
  const isFunded = milestone.status === 'FUNDED';
  const isReleased = milestone.status === 'RELEASED';

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: isReleased ? 'hsla(158, 64%, 52%, 0.2)' : isFunded ? 'hsla(38, 92%, 50%, 0.2)' : 'hsla(0, 84%, 60%, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {isReleased ? (
              <Unlock size={20} color="var(--success)" />
            ) : isFunded ? (
              <DollarSign size={20} color="var(--warning)" />
            ) : (
              <Lock size={20} color="var(--danger)" />
            )}
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Cryptographic Milestone Escrow & IP Vault</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
              Enforces hard cryptographic locks on Git repositories and API keys until milestone payment clears.
            </p>
          </div>
        </div>

        <div>
          {isLocked && <span className="badge badge-critical">Vault Locked (No Payment)</span>}
          {isFunded && <span className="badge badge-warning">Escrow Funded ($5,000 In Vault)</span>}
          {isReleased && <span className="badge badge-success">IP Assigned & Released</span>}
        </div>
      </div>

      {/* Milestone Card */}
      <div style={{
        background: 'hsla(222, 47%, 9%, 0.8)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '18px',
        marginBottom: '18px'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
            Project & Deliverable
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {milestone.project_name}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {milestone.milestone_title}
          </p>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <strong>Commitment Summary:</strong> {milestone.deliverable_summary}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
            Escrow Protected Amount
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
            ${milestone.amount_usd.toLocaleString()} USD
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Developer: <span style={{ color: 'var(--text-primary)' }}>{milestone.developer_email}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Client: <span style={{ color: 'var(--text-primary)' }}>{milestone.client_email}</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
            Cryptographic SHA-256 Deliverable Fingerprint
          </div>
          <div style={{
            background: 'hsla(222, 47%, 7%, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            color: '#a5b4fc',
            wordBreak: 'break-all',
            marginBottom: '8px'
          }}>
            {milestone.sha256_commitment}
          </div>
          <div style={{ fontSize: '0.78rem', color: isReleased ? 'var(--success)' : 'var(--warning)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Key size={14} />
            <span>{isReleased ? 'Git credentials unlocked' : 'Git credentials encrypted in vault'}</span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Left: Release Transaction Proof if done */}
        {isReleased && milestone.release_tx ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--success)' }}>
            <CheckCircle2 size={16} />
            <span>Immutable Release Certificate: <strong style={{ fontFamily: 'var(--font-mono)' }}>{milestone.release_tx.slice(0, 18)}...</strong></span>
          </div>
        ) : (
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            *Eliminates the #1 Reddit complaint: code is never surrendered until escrow funds are confirmed.
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {isLocked && (
            <button
              onClick={() => onFundMilestone(milestone.milestone_id)}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, hsl(38, 92%, 50%), hsl(30, 95%, 45%))', color: '#000' }}
            >
              <DollarSign size={16} />
              <span>Simulate Client Funding ($5,000)</span>
            </button>
          )}

          {isFunded && (
            <button
              onClick={() => handleReleaseWithCelebration(milestone.milestone_id)}
              disabled={isSigning}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, hsl(158, 64%, 45%), hsl(158, 64%, 55%))' }}
            >
              <ShieldCheck size={16} />
              <span>{isSigning ? 'Signing on Glass...' : 'Client Sign-Off & Release IP'}</span>
            </button>
          )}

          {isReleased && (
            <button
              disabled
              className="btn-secondary"
              style={{ color: 'var(--success)', borderColor: 'var(--success)' }}
            >
              <Award size={16} />
              <span>Milestone Completed & Certified</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
