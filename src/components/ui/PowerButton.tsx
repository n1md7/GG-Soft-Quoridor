import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

export type StateType = 'is-usable' | 'ad-available' | 'disabled';
export type PowerProps = {
  key: PowerEnum;
  name: string;
  description: string;
  placeholder: string;
  state: StateType;
};
export type PowerButtonProps = {
  power: PowerProps;
};

export function PowerButton({ power }: PowerButtonProps) {
  const { inventory, market, powers, advertisements } = useGame();

  const [state, setState] = useState<StateType>(power.state);

  const buttonClass = useMemo(() => {
    return classNames('button', {
      ['ad-available']: state === 'ad-available',
      ['disabled']: state === 'disabled',
    });
  }, [state]);

  const handleClick = useCallback(async () => {
    switch (state) {
      case 'is-usable':
        powers.use(power.key);
        break;
      case 'ad-available':
        await advertisements.showAd();
        inventory.unlockViaAd(power.key);
        break;
    }
  }, [inventory, power.key, powers, state, advertisements]);

  const onPurchaseAction = useCallback(
    (key: PowerEnum) => {
      if (power.key === key) {
        setState('is-usable');
      }
    },
    [power],
  );

  const onInventoryUseAction = useCallback(
    (key: PowerEnum) => {
      if (power.key === key) {
        setState('disabled');
      }
    },
    [power.key],
  );

  const onInventoryUnlockAction = useCallback(
    (key: PowerEnum) => {
      if (power.key === key) {
        setState('is-usable');
      }
    },
    [power],
  );

  useEffect(() => {
    market.on('purchase', onPurchaseAction);
    inventory.on('use', onInventoryUseAction);
    inventory.on('unlock', onInventoryUnlockAction);

    return () => {
      market.off('purchase', onPurchaseAction);
      inventory.off('use', onInventoryUseAction);
      inventory.off('unlock', onInventoryUnlockAction);
    };
  }, [inventory, market, onInventoryUnlockAction, onInventoryUseAction, onPurchaseAction]);

  return (
    <div className="power-container">
      <button onClick={handleClick} disabled={state === 'disabled'} className={buttonClass}>
        <div className="icon">{power.placeholder}</div>
      </button>

      <Show when={state === 'ad-available'}>
        <button onClick={handleClick} className="ad-overlay">
          <div className="play-icon">▶</div>
        </button>
      </Show>

      <div className="tooltip">
        <div className="title">{power.name}</div>
        <div className="description">
          {power.description}

          <Show when={state === 'is-usable'}>
            <div className="horizontal-divider" />
            <div className="hint-text">You own this power! You can activate it by clicking the button above.</div>
          </Show>
          <Show when={state === 'ad-available'}>
            <div className="horizontal-divider" />
            <div className="ad-message">
              You can unlock this power by watching an ad. Click the play button on the power icon to watch an ad.
            </div>
          </Show>
          <Show when={state === 'disabled'}>
            <div className="horizontal-divider" />
            <div className="hint-text">You can only use each power once per game.</div>
          </Show>
        </div>
      </div>
    </div>
  );
}
