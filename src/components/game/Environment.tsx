import { Environment as Env } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useControls } from 'leva';

export function Environment() {
  const { preset, intensity } = useControls(
    'Environment',
    {
      preset: {
        value: 'sunset' as PresetsType,
        options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city'] as PresetsType[],
        label: 'HDRI Preset',
      },
      intensity: {
        value: 0.4,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'Environment Intensity',
      },
    },
    {
      collapsed: true,
      color: '#70a6dc',
    },
  );

  return <Env preset={preset} environmentIntensity={intensity} />;
}
