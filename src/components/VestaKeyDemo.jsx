import React, { useState, useEffect } from 'react';
import VestaKey from './VestaKey';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const ALL_CHARS = ALPHABET + DIGITS;
const HELLO = 'HELLO';

export default function VestaKeyDemo() {
  const [input, setInput] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  const displayChars = (input.toUpperCase() + '            ').slice(0, 12).split('');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '48px 24px 80px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
      }}>
        {/* Heading */}
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 8,
          letterSpacing: '-0.5px',
        }}>
          Vestaboard Key Component
        </h1>
        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 56,
          letterSpacing: '0.3px',
        }}>
          A realistic split-flap tile with 3D depth, seam detail, and flip animation.
        </p>

        {/* HELLO row */}
        <section style={{ marginBottom: 56 }}>
          <Label>Large — "HELLO"</Label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {HELLO.split('').map((ch, i) => (
              <div
                key={i}
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                }}
              >
                <VestaKey character={ch} size="lg" delay={i * 120} />
              </div>
            ))}
          </div>
        </section>

        {/* A-Z + 0-9 grid */}
        <section style={{ marginBottom: 56 }}>
          <Label>Medium — All Characters</Label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}>
            {ALL_CHARS.split('').map((ch, i) => (
              <div
                key={ch}
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.35s ease ${0.4 + i * 0.025}s, transform 0.35s ease ${0.4 + i * 0.025}s`,
                }}
              >
                <VestaKey character={ch} size="md" delay={400 + i * 60} />
              </div>
            ))}
          </div>
        </section>

        {/* Small size showcase */}
        <section style={{ marginBottom: 56 }}>
          <Label>Small — "FLAPSTR"</Label>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {'FLAPSTR'.split('').map((ch, i) => (
              <VestaKey key={i} character={ch} size="sm" delay={i * 100} />
            ))}
          </div>
        </section>

        {/* Interactive input */}
        <section>
          <Label>Interactive — Type below (with flip animation)</Label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.slice(0, 12))}
            placeholder="Type something..."
            maxLength={12}
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 15,
              fontFamily: 'inherit',
              marginBottom: 16,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {displayChars.map((ch, i) => (
              <VestaKey key={i} character={ch} size="lg" delay={i * 80} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{
      fontSize: 11,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.3)',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginBottom: 12,
    }}>
      {children}
    </div>
  );
}
