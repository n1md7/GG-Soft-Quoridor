import { useControls } from 'leva';
import { DayLight } from './DayLight';
import { NightLight } from './NightLight';

export function Lights() {
  const { lightingMode } = useControls('Lighting Mode', {
    lightingMode: {
      value: 'day',
      options: {
        'Day Light': 'day',
        'Night Light': 'night',
      },
      label: 'Mode',
      hint: 'Switch between day and night lighting',
    },
  });

  return <>{lightingMode === 'day' ? <DayLight /> : <NightLight />}</>;
}
