import { useGame } from '@src/components/hooks/useGame.ts';
import { TUTORIAL_SEEN_KEY } from '@src/core/constants/storage.constants.ts';
import { setItem } from '@src/utils/storage.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

export type ForwardedTutorial = {
  show: () => void;
  hide: () => void;
};

const slides = [
  {
    gif: './gifs/pawn-placement.gif',
    title: 'Move Your Pawn',
    description: (
      <p className="slide-description">
        <strong>Click your pawn</strong> to see possible moves. Then click a <strong>highlighted block</strong> to move
        there.
      </p>
    ),
    color: 'move' as const,
  },
  {
    gif: './gifs/wall-placement.gif',
    title: 'Place Walls',
    description: (
      <p className="slide-description">
        <strong>Hover over block edges</strong> to preview wall placement. Click to place. Block your opponent's path!
      </p>
    ),
    color: 'wall' as const,
  },
  {
    gif: './gifs/player-win.gif',
    title: 'Reach the Other Side',
    description: (
      <p className="slide-description">
        Be the first to reach the <strong>opposite edge</strong> of the board. Each turn you can move{' '}
        <strong>or</strong> place a wall.
      </p>
    ),
    color: 'win' as const,
  },
];

export const Tutorial = forwardRef((_, ref: ForwardedRef<ForwardedTutorial>) => {
  const { states } = useGame();
  const [visible, setVisible] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slide = slides[slideIndex];
  const isLast = slideIndex === slides.length - 1;

  const onShow = useCallback(() => {
    setSlideIndex(0);
    setVisible(true);
  }, []);

  const onHide = useCallback(() => {
    setVisible(false);
  }, []);

  const onClose = useCallback(() => {
    setItem(TUTORIAL_SEEN_KEY, '1');
    states.changeState('play');
  }, [states]);

  const onNext = useCallback(() => {
    if (isLast) {
      onClose();
    } else {
      setSlideIndex((i) => i + 1);
    }
  }, [isLast, onClose]);

  const onPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(0, i - 1));
  }, []);

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
              {/* Slide */}
              <div className={`tutorial-slide ${slide.color}`} key={slideIndex}>
                <div className="slide-gif-container">
                  <img src={slide.gif} alt={slide.title} className="slide-gif" />
                </div>

                <div className="slide-text">
                  <h3 className="slide-title">{slide.title}</h3>
                  {slide.description}
                </div>
              </div>

              {/* Dots */}
              <div className="slide-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`slide-dot ${i === slideIndex ? 'active' : ''}`}
                    onClick={() => setSlideIndex(i)}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="slide-nav">
                {slideIndex > 0 ? (
                  <button className="nav-button prev" onClick={onPrev}>
                    Back
                  </button>
                ) : (
                  <button className="nav-button skip" onClick={onClose}>
                    Skip
                  </button>
                )}
                <button className="nav-button next" onClick={onNext}>
                  {isLast ? 'Got it!' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
