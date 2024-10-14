import { BufferGeometry, Material } from 'three';
import { useState } from 'react';

type Props = {
  geometry: BufferGeometry;
  position: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  name?: string;
  material?: Material | Material[];
};

const defaultColor = 'gray';
export function Block({ geometry, position, name, castShadow = false, receiveShadow = false }: Props) {
  const [color, setColor] = useState(defaultColor);

  const hoverMap = {
    10: 'red', // Top face id
    11: 'green', // Left face id
    12: 'blue', // Bottom face id
    13: 'purple', // Right face id
  };

  return (
    <mesh
      name={name}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      onPointerMove={(e) => {
        setColor(hoverMap[e.faceIndex] || defaultColor);
      }}
      onPointerOut={() => setColor(defaultColor)}
      geometry={geometry}
      position={position}
    >
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
