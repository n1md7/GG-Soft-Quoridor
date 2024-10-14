import { BufferGeometry, Material, MeshStandardMaterial } from 'three';
import { useRef } from 'react';

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
  const colorRef = useRef<MeshStandardMaterial>(null!);
  const colorMap = useRef({
    10: 'red', // Top face id
    11: 'green', // Left face id
    12: 'blue', // Bottom face id
    13: 'purple', // Right face id
  });
  console.info('yoo');

  return (
    <mesh
      name={name}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      onPointerMove={(e) => {
        colorRef.current.color.setColorName(colorMap.current[e.faceIndex] || defaultColor);
      }}
      onPointerOut={() => colorRef.current.color.setColorName(defaultColor)}
      geometry={geometry}
      position={position}
    >
      <meshStandardMaterial ref={colorRef} color={defaultColor} />
    </mesh>
  );
}
