import React from 'react';

const GITHUB_REPO = 'https://github.com/RakeshVn/flapstr';
const GITHUB_STARS_BADGE =
  'https://img.shields.io/github/stars/RakeshVn/flapstr?style=flat&logo=github&label=stars&color=%231a1a1a&labelColor=%23ebebeb&logoColor=%231a1a1a&cacheSeconds=120';

export default function Header({ muted, onVolumeClick, onPairDevice }) {
  return (
    <header className="header">
      <div className="header-logo">Flapstr.</div>
      <a
        className="header-github"
        href={GITHUB_REPO}
        target="_blank"
        rel="noopener noreferrer"
        title="Flapstr on GitHub — star the repo"
      >
        <img
          src={GITHUB_STARS_BADGE}
          alt="GitHub stars"
          className="header-github-badge"
          height={20}
          decoding="async"
        />
      </a>
      <div className="header-actions">
        {onPairDevice && (
          <button className="header-btn tv-mode-toggle" onClick={onPairDevice} title="Pair with mobile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span>Pair Device</span>
          </button>
        )}
        <button
          className={`header-btn volume-icon${muted ? ' muted' : ''}`}
          title="Toggle sound"
          onClick={onVolumeClick}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </button>
      </div>
    </header>
  );
}
