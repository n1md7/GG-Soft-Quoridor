import { BufferGeometry, Material, MeshStandardMaterial } from 'three';
import { useEffect, useRef } from 'react';
import { Vector3 } from '@react-three/fiber';

type Props = {
  geometry: BufferGeometry;
  position: Vector3;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name?: string;
  material?: Material | Material[];
  scale?: Vector3;
  wireframe?: boolean;
};

const defaultColor = 'gray';

export function Block({ geometry, position, name, scale, wireframe = false }: Props) {
  const colorRef = useRef<MeshStandardMaterial>(null!);
  const colorMap = useRef<Record<number, string>>({
    11: 'red', // Top face id
    13: 'green', // Left face id
    15: 'blue', // Bottom face id
    17: 'purple', // Right face id
  });

  useEffect(() => {
    if (colorRef.current) colorRef.current.wireframe = wireframe;
  }, [colorRef, wireframe]);

  return (
    <mesh
      name={name}
      castShadow={true}
      receiveShadow={true}
      onPointerMove={({ faceIndex }) => {
        if (!faceIndex) return;
        colorRef.current.color.setColorName(colorMap.current[faceIndex] || defaultColor);
      }}
      onPointerOut={() => colorRef.current.color.setColorName(defaultColor)}
      geometry={geometry}
      position={position}
      scale={scale}
    >
      <meshStandardMaterial ref={colorRef} color={defaultColor} />
    </mesh>
  );
}
