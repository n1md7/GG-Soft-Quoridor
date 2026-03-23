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
          <span className="header">Credits</span>
          <button className="close-btn" onClick={onClose} aria-label="Close market"></button>
        </div>

        <div className="credits-content">
          <section className="credits-section">
            <h3 className="header">Developers: </h3>
            <div className="credits-item">
              <ul>
                <li>Lead developer: Harry Kodua</li>
                <li>Frontend developer: Kathleen Povadora</li>
              </ul>
            </div>
          </section>
          <section className="credits-section">
            <h3 className="header">Designers</h3>
            <div className="credits-item">
              <ul>
                <li>3D assets: Harry Kodua</li>
                <li>UI/UX: Kathleen Povadora</li>
              </ul>
            </div>
          </section>

          <section className="credits-section">
            <div className="credits-item">
              All audios, music and 3D background's credits goes to their respective owners. Quoridor 3D is inspired by
              Mirko Marchesi's Quoridor.
            </div>
          </section>

          <section className="credits-section credits-footer">
            <span className="header">Thank you for playing Quoridor 3D!</span>
          </section>
        </div>
      </div>
    </div>
  );
});
