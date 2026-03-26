import { useGame } from '@src/components/hooks/useGame.ts';
import { HINTS_SEEN_KEY } from '@src/core/constants/storage.constants.ts';
import { getItem, setItem } from '@src/utils/storage.ts';
import { useCallback, useEffect, useRef, useState } from 'react';

type HintStep = 'none' | 'pawn' | 'wall';

export function GameplayHints() {
  const { states, player } = useGame();
  const [hint, setHint] = useState<HintStep>('none');
  const pawnTimerRef = useRef<NodeJS.Timeout>(null);
  const wallTimerRef = useRef<NodeJS.Timeout>(null);
  const hasShownRef = useRef(false);
  const pawnClickedRef = useRef(false);

  const dismiss = useCallback(() => {
    setHint('none');

    if (pawnTimerRef.current) clearTimeout(pawnTimerRef.current);
    if (wallTimerRef.current) clearTimeout(wallTimerRef.current);
  }, []);

  const dismissPawnAndShowWall = useCallback(() => {
    if (pawnClickedRef.current) return;
    pawnClickedRef.current = true;
    setHint('none');

    wallTimerRef.current = setTimeout(() => {
      setHint('wall');
    }, 1500);
  }, []);

  const dismissAll = useCallback(() => {
    dismiss();
    setItem(HINTS_SEEN_KEY, '1');
    hasShownRef.current = true;
  }, [dismiss]);

  useEffect(() => {
    const alreadySeen = getItem(HINTS_SEEN_KEY) === '1';
    if (alreadySeen) return;

    const onStateChange = (state: string) => {
      if (state === 'play' && !hasShownRef.current) {
        pawnTimerRef.current = setTimeout(() => {
          setHint('pawn');
        }, 3000);
      }

      if (state !== 'play') {
        dismiss();
      }
    };

    states.on('state', onStateChange);

    return () => {
      states.off('state', onStateChange);

      if (pawnTimerRef.current) clearTimeout(pawnTimerRef.current);
      if (wallTimerRef.current) clearTimeout(wallTimerRef.current);
    };
  }, [states, dismiss]);

  // Listen for pawn click (mode toggle) to transition from pawn hint to wall hint
  useEffect(() => {
    if (hint !== 'pawn') return;

    const originalToggle = player.mode.toggle;
    player.mode.toggle = function () {
      originalToggle.call(this);
      dismissPawnAndShowWall();

      // Restore original after first intercept
      player.mode.toggle = originalToggle;
    };

    return () => {
      player.mode.toggle = originalToggle;
    };
  }, [hint, player.mode, dismissPawnAndShowWall]);

  // Auto-dismiss wall hint after 6 seconds
  useEffect(() => {
    if (hint !== 'wall') return;

    const timer = setTimeout(() => {
      dismissAll();
    }, 6000);

    return () => clearTimeout(timer);
  }, [hint, dismissAll]);

  if (hint === 'none') return null;

  return (
    <div className="gameplay-hints" onClick={dismissAll}>
      {hint === 'pawn' && (
        <div className="hint-container hint-pawn">
          <div className="hint-label">Click your pawn!</div>
          <div className="hint-arrow">
            <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
              <path d="M16 0 L16 36" stroke="#06c7cf" strokeWidth="3" strokeLinecap="round" />
              <path d="M6 28 L16 42 L26 28" fill="#06c7cf" />
            </svg>
          </div>
        </div>
      )}
      {hint === 'wall' && (
        <div className="hint-container hint-wall">
          <div className="hint-arrow hint-arrow-up">
            <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
              <path d="M16 48 L16 12" stroke="#8a4cff" strokeWidth="3" strokeLinecap="round" />
              <path d="M6 20 L16 6 L26 20" fill="#8a4cff" />
            </svg>
          </div>
          <div className="hint-label wall">Hover over blocks to place walls!</div>
        </div>
      )}
    </div>
  );
}
