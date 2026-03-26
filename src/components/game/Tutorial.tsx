import { useGame } from '@src/components/hooks/useGame.ts';
import { TUTORIAL_SEEN_KEY } from '@src/core/constants/storage.constants.ts';
import { setItem } from '@src/utils/storage.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

export type ForwardedTutorial = {
  show: () => void;
  hide: () => void;
};

export const Tutorial = forwardRef((_, ref: ForwardedRef<ForwardedTutorial>) => {
  const { states } = useGame();
  const [visible, setVisible] = useState(false);

  const onShow = useCallback(() => {
    setVisible(true);
  }, []);

  const onHide = useCallback(() => {
    setVisible(false);
  }, []);

  const onClose = useCallback(() => {
    setItem(TUTORIAL_SEEN_KEY, '1');
    states.changeState('play');
  }, [states]);

  useImperativeHandle(
    ref,
    () => ({
      show: onShow,
      hide: onHide,
    }),
    [onShow, onHide],
  );

  if (!visible) return null;

  return (
    <div className="tutorial-view">
      <div className="main-container">
        <div className="tutorial-wrapper">
          <div className="inner-container">
            {/* Header */}
            <div className="tutorial-header">
              <div className="header-left"></div>
              <div className="trapezoid header-center">
                <span className="header">How to Play</span>
              </div>
              <div className="header-right">
                <button className="close-btn" onClick={onClose} aria-label="Close tutorial"></button>
              </div>
            </div>

            {/* Body */}
            <div className="tutorial-body">
              {/* Step 1: Move */}
              <div className="tutorial-step">
                <div className="step-illustration">
                  <div className="illustration-placeholder move">
                    <div className="step-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M12 14v4m-3-2h6" />
                        <path d="M8 20h8" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-number">1</div>
                  <h3 className="step-title">Move Your Pawn</h3>
                  <p className="step-description">
                    <strong>Click your pawn</strong> to see possible moves. Then click a{' '}
                    <strong>highlighted block</strong> to move there.
                  </p>
                </div>
              </div>

              {/* Step 2: Place Walls */}
              <div className="tutorial-step">
                <div className="step-illustration">
                  <div className="illustration-placeholder wall">
                    <div className="step-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="8" width="18" height="4" rx="1" />
                        <path d="M7 4v4m5-4v4m5-4v4" />
                        <path d="M7 12v4m5-4v4m5-4v4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-number">2</div>
                  <h3 className="step-title">Place Walls</h3>
                  <p className="step-description">
                    <strong>Hover over block edges</strong> to preview wall placement. Click to place. Block your
                    opponent's path!
                  </p>
                </div>
              </div>

              {/* Step 3: Win */}
              <div className="tutorial-step">
                <div className="step-illustration">
                  <div className="illustration-placeholder win">
                    <div className="step-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7" />
                        <path d="M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7" />
                        <path d="M4 22h16" />
                        <path d="M10 22V2h4v20" />
                        <path d="M8 6h8" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-number">3</div>
                  <h3 className="step-title">Reach the Other Side</h3>
                  <p className="step-description">
                    Be the first to reach the <strong>opposite edge</strong> of the board. Each turn you can move{' '}
                    <strong>or</strong> place a wall.
                  </p>
                </div>
              </div>

              {/* Got It button */}
              <button className="got-it-button" onClick={onClose}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
