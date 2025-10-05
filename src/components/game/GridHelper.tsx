import { Grid } from '@react-three/drei';
import { useControls } from 'leva';

export function GridHelper() {
  const { fadeDistance, fadeStrength, cellSize, sectionSize, sectionColor, cellColor } = useControls(
    'Grid',
    {
      fadeDistance: {
        value: 500,
        min: 100,
        max: 1000,
        step: 10,
      },
      fadeStrength: {
        value: 5,
        min: 1,
        max: 10,
        step: 1,
      },
      cellSize: {
        value: 0.6,
        min: 0.1,
        max: 2,
        step: 0.1,
      },
      sectionSize: {
        value: 3,
        min: 1,
        max: 10,
        step: 1,
      },
      sectionColor: '#d0cfeb',
      cellColor: '#6c6666',
    },
    {
      order: 1,
      collapsed: true,
      color: '#797171',
    },
  );

  return (
    <Grid
      infiniteGrid
      fadeDistance={fadeDistance}
      fadeStrength={fadeStrength}
      cellSize={cellSize}
      sectionSize={sectionSize}
      sectionColor={sectionColor}
      cellColor={cellColor}
    />
  );
}
