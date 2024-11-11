import { Vector3 } from '@react-three/fiber';
import { Nodes } from '@src/components/game/Board.tsx';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Material, Mesh, MeshStandardMaterial } from 'three';

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

export type BlockName = keyof ExtractPropertiesStartingWith<Nodes, 'Block'>;
export type ForwardedBlock = {
  mesh: Mesh;
  name: BlockName;
  hola: () => void;
  changeColor: (color: 'RED' | 'GREEN' | 'BLUE' | 'PURPLE') => void;
};

const defaultColor = 'gray';

export const Block = forwardRef(
  ({ geometry, position, name, scale, wireframe = false }: Props, ref: ForwardedRef<ForwardedBlock>) => {
    const colorRef = useRef<MeshStandardMaterial>(null!);
    const colorMap = useRef<Record<number, string>>({
      8: 'red', // Top face id
      9: 'green', // Left face id
      10: 'blue', // Bottom face id
      11: 'purple', // Right face id
    });
    const mesh = useRef<Mesh>(null!);

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        name: mesh.current.name as BlockName,
        hola: () => console.log('Hola'),
        changeColor: (color: 'RED' | 'GREEN' | 'BLUE' | 'PURPLE') => {
          colorRef.current.color.setColorName(color);
        },
      };
    }, []);

    useEffect(() => {
      if (colorRef.current) colorRef.current.wireframe = wireframe;
    }, [colorRef, wireframe]);

    return (
      <mesh
        ref={mesh}
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
  },
);
