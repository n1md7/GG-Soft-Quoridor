import { Vector3 } from '@react-three/fiber';
import { Nodes } from '@src/components/game/Board.tsx';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { BufferGeometry, Material, Mesh, MeshStandardMaterial } from 'three';

export type Colors = 'RED' | 'GREEN' | 'BLUE' | 'PURPLE';
export type Positions = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';
export type CoordsType = { row: number; col: number };
export type CoordsWitPosType = CoordsType & { pos: Positions };

export type BlockName = keyof ExtractPropertiesStartingWith<Nodes, 'Block'>;
export type ForwardedBlock = {
  mesh: Mesh;
  name: BlockName;
  material: MeshStandardMaterial;
  getCoordinates: () => CoordsType;
  changeColor: (color: Colors) => void;
};

export type Props = {
  geometry: BufferGeometry;
  position: Vector3;
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name: BlockName;
  material?: Material | Material[];
  scale?: Vector3;
  handleClick: (coords: CoordsWitPosType) => void;
};

const defaultColor = 'GRAY';

export const Block = forwardRef(
  ({ geometry, position, name, scale, handleClick }: Props, ref: ForwardedRef<ForwardedBlock>) => {
    const { getCoordinatesByBlockName } = useGrid();
    const { row, col } = useMemo(() => getCoordinatesByBlockName(name), [getCoordinatesByBlockName, name]);

    const hoveredFace = useRef<number>(null!);
    const colorRef = useRef<MeshStandardMaterial>(null!);
    const colorMap = useRef<Record<number, Colors>>({
      8: 'RED',
      9: 'GREEN',
      10: 'BLUE',
      11: 'PURPLE',
    });
    const faceIdPositionMap = useRef<Record<number, Positions>>({
      8: 'RIGHT',
      9: 'BOTTOM',
      10: 'LEFT',
      11: 'TOP',
    });

    const mesh = useRef<Mesh>(null!);

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        material: colorRef.current,
        name: mesh.current.name as BlockName,
        getCoordinates: () => ({ row, col }),
        changeColor: (color: 'RED' | 'GREEN' | 'BLUE' | 'PURPLE') => {
          colorRef.current.color.setColorName(color);
        },
      };
    }, []);

    return (
      <mesh
        ref={mesh}
        name={name}
        castShadow={true}
        receiveShadow={true}
        onClick={() => {
          const pos = faceIdPositionMap.current[hoveredFace.current];

          if (!pos) return; // Not a valid face, we don't care side faces

          handleClick({
            row,
            col,
            pos,
          });
        }}
        onPointerMove={({ faceIndex }) => {
          if (!faceIndex) return;
          if (hoveredFace.current === faceIndex) return;
          hoveredFace.current = faceIndex;
          colorRef.current.color.setColorName(colorMap.current[faceIndex] || defaultColor);
        }}
        onPointerOut={() => colorRef.current.color.setColorName(defaultColor)}
        geometry={geometry}
        position={position}
        scale={scale}
      >
        <meshStandardMaterial ref={colorRef} color={defaultColor} attach="material" />
      </mesh>
    );
  },
);
