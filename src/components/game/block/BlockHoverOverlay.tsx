import { Positions } from '@src/components/game/block/block.type.ts';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { DoubleSide, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three';

type Props = {
  hoveredPosition: Positions | null;
};

export const BlockHoverOverlay = ({ hoveredPosition }: Props) => {
  // Load the base texture
  const baseTexture = useLoader(TextureLoader, '/textures/block/hovered-block-no-bg.png');

  // Create materials with proper rotations
  const materials = useMemo(() => {
    const mats: Record<Positions, MeshBasicMaterial> = {} as any;

    // TOP: Use original texture (arrow pointing up)
    const topTexture = baseTexture.clone();
    topTexture.needsUpdate = true;
    mats.TOP = new MeshBasicMaterial({
      map: topTexture,
      transparent: true,
      opacity: 0.8,
      side: DoubleSide,
      depthWrite: false,
      depthTest: false, // Back to no depth test for visibility
    });

    // RIGHT: Rotate 270° (arrow pointing right) - SWAPPED
    const rightTexture = baseTexture.clone();
    rightTexture.center.set(0.5, 0.5);
    rightTexture.rotation = -Math.PI / 2; // Was Math.PI / 2
    rightTexture.needsUpdate = true;
    mats.RIGHT = new MeshBasicMaterial({
      map: rightTexture,
      transparent: true,
      opacity: 0.8,
      side: DoubleSide,
      depthWrite: false,
      depthTest: false,
    });

    // BOTTOM: Rotate 180° (arrow pointing down)
    const bottomTexture = baseTexture.clone();
    bottomTexture.center.set(0.5, 0.5);
    bottomTexture.rotation = Math.PI;
    bottomTexture.needsUpdate = true;
    mats.BOTTOM = new MeshBasicMaterial({
      map: bottomTexture,
      transparent: true,
      opacity: 0.8,
      side: DoubleSide,
      depthWrite: false,
      depthTest: false,
    });

    // LEFT: Rotate 90° (arrow pointing left) - SWAPPED
    const leftTexture = baseTexture.clone();
    leftTexture.center.set(0.5, 0.5);
    leftTexture.rotation = Math.PI / 2; // Was -Math.PI / 2
    leftTexture.needsUpdate = true;
    mats.LEFT = new MeshBasicMaterial({
      map: leftTexture,
      transparent: true,
      opacity: 0.8,
      side: DoubleSide,
      depthWrite: false,
      depthTest: false,
    });

    return mats;
  }, [baseTexture]);

  // Much larger geometry for full visual coverage
  const geometry = useMemo(() => {
    const geom = new PlaneGeometry(1.8, 1.8); // 80% bigger for full coverage
    geom.rotateX(-Math.PI / 2); // Rotate to lie flat on XZ plane
    return geom;
  }, []);

  if (!hoveredPosition) return null;

  return (
    <mesh
      position={[0, 0.02, 0]} // Very close to block surface
      geometry={geometry}
      material={materials[hoveredPosition]}
      renderOrder={0} // Normal render order
      frustumCulled={false}
    />
  );
};
