import { memo } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreditsModal = memo(function CreditsModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="credits-overlay" onClick={onClose}>
      <div className="credits-modal" onClick={(e) => e.stopPropagation()}>
        <div className="credits-header">
          <h2>Credits</h2>
          <button className="credits-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="credits-content">
          <section className="credits-section">
            <h3>🎨 Visual Assets</h3>
            <div className="credits-item">
              <strong>3D Models</strong>
              <ul>
                <li>Game Board Models (v1.0 - v1.4)</li>
                <li>Environment Room Model</li>
                <li>Fox Character Model</li>
              </ul>
            </div>
            <div className="credits-item">
              <strong>Textures & UI</strong>
              <ul>
                <li>Block & Wall Textures</li>
                <li>Player, Rank, Volume Icons</li>
                <li>Quoridor Logo</li>
              </ul>
            </div>
          </section>

          <section className="credits-section">
            <h3>🔊 Audio</h3>
            <div className="credits-item">
              <ul>
                <li>Background Music</li>
                <li>Pawn Movement & Wall Placement Sounds</li>
                <li>Win & Error Sound Effects</li>
              </ul>
            </div>
          </section>

          <section className="credits-section">
            <h3>🔤 Fonts</h3>
            <div className="credits-item">
              <ul>
                <li>
                  <strong>Bebas Neue</strong> - Vernon Adams
                </li>
                <li>
                  <strong>Caprasimo</strong> - Google Fonts
                </li>
                <li>
                  <strong>Chelsea Market</strong> - Font Squirrel
                </li>
                <li>
                  <strong>Corporation Games</strong> - Typodermic Fonts
                </li>
              </ul>
            </div>
          </section>

          <section className="credits-section">
            <h3>⚙️ Technologies</h3>
            <div className="credits-item">
              <ul>
                <li>
                  <strong>React</strong> & <strong>TypeScript</strong>
                </li>
                <li>
                  <strong>Three.js</strong> & <strong>React Three Fiber</strong>
                </li>
                <li>
                  <strong>Vite</strong> & <strong>Tailwind CSS</strong>
                </li>
              </ul>
            </div>
          </section>

          <section className="credits-section credits-footer">
            <p>Thank you for playing Quoridor 3D!</p>
          </section>
        </div>
      </div>
    </div>
  );
});
