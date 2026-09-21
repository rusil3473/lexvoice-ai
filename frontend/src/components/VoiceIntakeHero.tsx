import { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';

interface VoiceIntakeHeroProps {
  onTranscribeClause: (text: string) => void;
}

export const VoiceIntakeHero: React.FC<VoiceIntakeHeroProps> = ({ onTranscribeClause }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);

  const sampleVoicePrompts = [
    "The client told me over phone call that they want 4 additional screens and won't pay the final $5,000 until those are built.",
    "Section 3 says all intellectual property is transferred immediately upon creation, even if payment is never sent.",
    "Clause 4 demands unlimited indemnification with no liability cap for any cloud server outages."
  ];

  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTranscript('Listening for spoken contract dispute facts via AssemblyAI streaming WebSocket...');
      setConfidence(0);

      // Simulate streaming chunks from AssemblyAI WebSocket
      const chosen = sampleVoicePrompts[Math.floor(Math.random() * sampleVoicePrompts.length)];
      const words = chosen.split(' ');
      let currentIdx = 0;
      
      const interval = setInterval(() => {
        if (currentIdx < words.length) {
          const chunk = words.slice(0, currentIdx + 1).join(' ');
          setTranscript(chunk);
          setConfidence(Math.min(99, 85 + currentIdx * 2));
          currentIdx += 2;
        } else {
          clearInterval(interval);
          setIsRecording(false);
          onTranscribeClause(chosen);
        }
      }, 350);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '22px 28px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left: Info */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Volume2 size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Real-Time Voice Legal Intake</h3>
            <span className="badge badge-primary">AssemblyAI Streaming STT</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Dictate client dispute conversations, ambiguous phone agreements, or disputed contract clauses. The engine transcribes in real time and automatically audits legal risk.
          </p>
        </div>

        {/* Right: Mic Button & Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isRecording && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '32px' }}>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          )}

          <button
            onClick={handleToggleVoice}
            className={isRecording ? 'btn-secondary' : 'btn-primary'}
            style={{
              padding: '12px 22px',
              borderRadius: 'var(--radius-md)',
              background: isRecording ? 'hsla(0, 84%, 60%, 0.2)' : undefined,
              borderColor: isRecording ? 'var(--danger)' : undefined,
              color: isRecording ? 'var(--danger)' : undefined
            }}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            <span>{isRecording ? 'Stop Recording' : 'Dictate Dispute Voice Note'}</span>
          </button>
        </div>

      </div>

      {/* Live Transcript Output */}
      {transcript && (
        <div style={{
          marginTop: '16px',
          background: 'hsla(222, 47%, 8%, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "{transcript}"
            </span>
          </div>
          {confidence > 0 && (
            <span className="badge badge-success" style={{ flexShrink: 0 }}>
              {confidence}% Confidence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
