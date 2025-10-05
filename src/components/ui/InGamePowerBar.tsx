import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { useCallback, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

type StateType = 'is-usable' | 'ad-available' | 'disabled';
type PowerProps = {
  key: PowerEnum;
  name: string;
  description: string;
  placeholder: string;
  state: StateType;
};

export function InGamePowerBar() {
  const { inventory } = useGame();

  const powers: PowerProps[] = useMemo(
    () =>
      [
        {
          key: PowerEnum.ExtraWall,
          name: 'Extra Wall',
          description: 'Get an additional wall to place.',
          placeholder: '🧱',
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.ShortestPath,
          name: 'Show Path',
          description: 'Show the shortest path to your goal.',
          placeholder: '🗺️',
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.BlockMove,
          name: 'Block Move',
          description: 'Block opponent from moving. This makes opponent to skip one move.',
          placeholder: '🚫',
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.Undo,
          name: 'Undo',
          description: 'Undo your last move you and player made.',
          placeholder: '↶',
          state: 'disabled' as StateType,
        },
      ].map((power) => {
        const item = inventory.getItems().find((item) => item.getKey() === power.key);

        if (item) {
          if (item.isUsable()) power.state = 'is-usable';
          else if (item.canWatchAd()) power.state = 'ad-available';
        }

        return power;
      }),
    [inventory],
  );

  return (
    <div
      className="power-bar"
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <div className="relative">
        <div className="bar-container">
          <div className="top-line" />
          <div className="bottom-line" />
          {powers.map((power, index) => (
            <div key={power.key} className="item">
              <PowerButton power={power} />
              <Show when={index < powers.length - 1}>
                <div className="vertical-divider" />
              </Show>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type PowerButtonProps = {
  power: PowerProps;
};

function PowerButton({ power }: PowerButtonProps) {
  const { inventory, market, powers } = useGame();

  const [state, setState] = useState<StateType>(power.state);

  const buttonClass = useMemo(() => {
    return classNames('button', {
      ['ad-available']: state === 'ad-available',
      ['disabled']: state === 'disabled',
    });
  }, [state]);

  const handleClick = useCallback(() => {
    switch (state) {
      case 'is-usable':
        powers.use(power.key);
        break;
      case 'ad-available':
        inventory.unlockViaAd(power.key);
        break;
    }
  }, [inventory, power.key, powers, state]);

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
