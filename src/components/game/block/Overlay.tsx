import { Positions } from '@src/components/game/block/block.type.ts';
import { useLoader } from '@react-three/fiber';
import { useCallback, useMemo } from 'react';
import { DoubleSide, MeshBasicMaterial, MeshBasicMaterialParameters, PlaneGeometry, TextureLoader } from 'three';

type Props = {
  hoveredPosition: Positions | null;
};

// Rotation mapping for each direction
const DIRECTION_ROTATIONS: Record<Positions, number> = {
  TOP: 0,
  RIGHT: -Math.PI / 2,
  BOTTOM: Math.PI,
  LEFT: Math.PI / 2,
} as const;

// Shared material properties for consistency
const MATERIAL_CONFIG: MeshBasicMaterialParameters = {
  transparent: true,
  opacity: 0.8,
  side: DoubleSide,
  depthWrite: false,
  depthTest: false,
} as const;

// Geometry constants
const OVERLAY_SIZE = 1.8;
const OVERLAY_HEIGHT = 0.02;

export const Overlay = ({ hoveredPosition }: Props) => {
  const baseTexture = useLoader(TextureLoader, './textures/block/hovered-block-no-bg.png');
  const createMaterial = useCallback(
    (direction: Positions): MeshBasicMaterial => {
      const texture = baseTexture.clone();

      // Apply rotation if needed
      if (DIRECTION_ROTATIONS[direction] !== 0) {
        texture.center.set(0.5, 0.5);
        texture.rotation = DIRECTION_ROTATIONS[direction];
      }

      texture.needsUpdate = true;

      return new MeshBasicMaterial({
        map: texture,
        ...MATERIAL_CONFIG,
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
    const geom = new PlaneGeometry(OVERLAY_SIZE, OVERLAY_SIZE);
    geom.rotateX(-Math.PI / 2); // Flat on XZ plane
    return geom;
  }, []);

  if (!hoveredPosition) return null;

  return <mesh position={[0, OVERLAY_HEIGHT, 0]} geometry={geometry} material={materials[hoveredPosition]} />;
};
