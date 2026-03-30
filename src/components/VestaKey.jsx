import React, { useState, useEffect, useRef, memo } from 'react';
import './VestaKey.css';

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";

const SIZES = { sm: 48, md: 72, lg: 96 };

/**
 * VestaKey — A realistic split-flap character tile.
 *
 * Props:
 *   character  – single character to display
 *   size       – 'sm' | 'md' | 'lg'
 *   delay      – ms before animation starts (for stagger)
 *   stepMs     – ms between scramble steps
 *   flipDuration – seconds for the CSS flip
 */
const VestaKey = memo(function VestaKey({
  character = ' ',
  size = 'md',
  delay = 0,
  stepMs = 55,
  flipDuration = 0.35,
}) {
  const [current, setCurrent] = useState(' ');
  const [prev, setPrev] = useState(' ');
  const [flipId, setFlipId] = useState(0);

  const curRef = useRef(' ');
  const tgtRef = useRef(null);
  const startTimer = useRef(null);
  const stepTimer = useRef(null);

  useEffect(() => {
    if (startTimer.current) clearTimeout(startTimer.current);
    if (stepTimer.current) clearTimeout(stepTimer.current);

    const normalized = FLAP_CHARS.includes(character.toUpperCase())
      ? character.toUpperCase()
      : ' ';

    if (normalized === tgtRef.current) return;
    tgtRef.current = normalized;

    if (normalized === ' ' && curRef.current === ' ') return;

    const scrambleCount =
      normalized === ' '
        ? 2 + Math.floor(Math.random() * 3)
        : 5 + Math.floor(Math.random() * 7);

    const runStep = (i) => {
      const isLast = i === scrambleCount;
      const ch = isLast
        ? normalized
        : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];

      setPrev(curRef.current);
      curRef.current = ch;
      setCurrent(ch);
      setFlipId((n) => n + 1);

      if (!isLast) {
        stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
      }
    };

    startTimer.current = setTimeout(() => runStep(1), delay);

    return () => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      tgtRef.current = null;
    };
  }, [character, delay, stepMs]);

  const show = current === ' ' ? '\u00A0' : current;
  const showPrev = prev === ' ' ? '\u00A0' : prev;

  const px = SIZES[size] || SIZES.md;
  const flipS = flipDuration;
  const bottomDelay = flipS * 0.5;

  return (
    <div className="vk-cell" style={{ '--vk-size': `${px}px` }}>
      {/* Flap content area */}
      <div className="vk-flap-area">
        {/* Ridges / horizontal lines */}
        <div className="vk-ridges">
          <div className="vk-ridge" style={{ top: '15%' }} />
          <div className="vk-ridge" style={{ top: '30%' }} />
          <div className="vk-ridge" style={{ top: '70%' }} />
          <div className="vk-ridge" style={{ top: '85%' }} />
        </div>

        {/* Static top — new char top half */}
        <div className="vk-half vk-half-top">
          <span className="vk-char">{show}</span>
        </div>

        {/* Static bottom — new char bottom half */}
        <div className="vk-half vk-half-bottom">
          <span className="vk-char">{show}</span>
          {flipId > 0 && (
            <div
              className="vk-shadow-overlay"
              style={{
                animation: `vk-shadow-fade ${flipS}s ease-out ${bottomDelay}s both`,
              }}
            />
          )}
        </div>

        {/* Flipping top flap — old char, drops down */}
        {flipId > 0 && (
          <div
            key={`ft-${flipId}`}
            className="vk-flap vk-flap-top"
            style={{
              animation: `vk-flip-top-half ${flipS}s ease-in forwards`,
            }}
          >
            <span className="vk-char">{showPrev}</span>
            <div className="vk-flap-shade" />
          </div>
        )}

        {/* Flipping bottom flap — new char, rises up */}
        {flipId > 0 && (
          <div
            key={`fb-${flipId}`}
            className="vk-flap vk-flap-bottom"
            style={{
              animation: `vk-flip-bottom-half ${flipS * 0.6}s ease-out ${bottomDelay}s forwards`,
            }}
          >
            <span className="vk-char">{show}</span>
            <div className="vk-flap-shine" />
          </div>
        )}

        {/* Split line */}
        <div className="vk-split-line" />
      </div>

      {/* Bottom decorative stripe */}
      <div className="vk-bottom-stripe" />
    </div>
  );
}, (a, b) =>
  a.character === b.character &&
  a.size === b.size &&
  a.delay === b.delay &&
  a.stepMs === b.stepMs &&
  a.flipDuration === b.flipDuration
);

export default VestaKey;
