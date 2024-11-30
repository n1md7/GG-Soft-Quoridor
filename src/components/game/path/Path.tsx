import { Line } from '@react-three/drei';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show';
import { pathColor } from '@src/config/highlight.config.ts';
import { useControls } from 'leva';
import { useState } from 'react';
import { Vector3 } from 'three';

export const Path = () => {
  const game = useGame();

  const [path, setPath] = useState<Vector3[]>([]);

  game.computer.onPathUpdate((updatedPath) => {
    setPath(updatedPath);
  });

  const { position, dashed, visible } = useControls('Path highlight', {
    position: [0, 0.07, 0],
    dashed: false,
    visible: true,
  });

  return (
    <Show when={path.length > 0}>
      <Line visible={visible} points={path} color={pathColor} lineWidth={4} dashed={dashed} position={position} />
    </Show>
  );
};
