import { BufferGeometry, Material, MeshStandardMaterial } from 'three';
import { useEffect, useRef } from 'react';
import { Vector3 } from '@react-three/fiber';

type Props = {
  geometry: BufferGeometry;
  position: Vector3;
  wireframe: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name?: string;
  material?: Material | Material[];
  scale?: Vector3;
};

const defaultColor = 'gray';

export function Block({ geometry, position, name, scale, wireframe = false }: Props) {
  const colorRef = useRef<MeshStandardMaterial>(null!);
  const colorMap = useRef<Record<number, string>>({
    8: 'red', // Top face id
    9: 'green', // Left face id
    10: 'blue', // Bottom face id
    11: 'purple', // Right face id
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
