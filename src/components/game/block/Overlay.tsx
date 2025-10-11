import { Positions } from '@src/components/game/block/block.type.ts';
import { useLoader } from '@react-three/fiber';
import { useCallback, useMemo } from 'react';
import { DoubleSide, MeshBasicMaterial, MeshBasicMaterialParameters, PlaneGeometry, TextureLoader } from 'three';

type Props = {
  hoveredPosition: Positions | null;
};

const directionRotations: Record<Positions, number> = {
  TOP: 0,
  RIGHT: -Math.PI / 2,
  BOTTOM: Math.PI,
  LEFT: Math.PI / 2,
} as const;

const materialProps: MeshBasicMaterialParameters = {
  transparent: true,
  opacity: 0.9,
  side: DoubleSide,
  depthWrite: false,
  depthTest: false,
} as const;

// Geometry constants
const OVERLAY_SIZE = 2.2;
const OVERLAY_HEIGHT = 0.64;

export const Overlay = ({ hoveredPosition }: Props) => {
  const baseTexture = useLoader(TextureLoader, './textures/block/hovered-block-no-bg.png');
  const createMaterial = useCallback(
    (direction: Positions): MeshBasicMaterial => {
      const texture = baseTexture.clone();

      if (directionRotations[direction]) {
        texture.center.set(0.5, 0.5);
        texture.rotation = directionRotations[direction];
      }

      // Required to update the texture after modifications
      texture.needsUpdate = true;

      return new MeshBasicMaterial({
        map: texture,
        ...materialProps,
      });
    },
    [baseTexture],
  );

  const materials = useMemo(() => {
    return {
      TOP: createMaterial('TOP'),
      RIGHT: createMaterial('RIGHT'),
      BOTTOM: createMaterial('BOTTOM'),
      LEFT: createMaterial('LEFT'),
    };
  }, [createMaterial]);

  const geometry = useMemo(() => {
    const geometry = new PlaneGeometry(OVERLAY_SIZE, OVERLAY_SIZE);
    geometry.rotateX(-Math.PI / 2); // Flat on XZ plane

    return geometry;
  }, []);

  if (!hoveredPosition) return null;

  return <mesh position={[0, OVERLAY_HEIGHT, 0]} geometry={geometry} material={materials[hoveredPosition]} />;
};
