import { useControls } from 'leva';
import { DayLight } from './DayLight';
import { NightLight } from './NightLight';

type LightsProps = {
  mode?: 'day' | 'night';
};

export function Lights({ mode }: LightsProps) {
  // Keep Leva controls for debugging, but allow override from props
  const { lightingMode: levaMode } = useControls('Lighting Mode', {
    lightingMode: {
      value: 'day',
      options: {
        'Day Light': 'day',
        'Night Light': 'night',
      },
      label: 'Mode',
      hint: 'Switch between day and night lighting (can be overridden by UI controls)',
    },
  });

  // Use prop mode if provided, otherwise fall back to Leva controls
  const effectiveMode = mode || levaMode;

  return <>{effectiveMode === 'day' ? <DayLight /> : <NightLight />}</>;
}
