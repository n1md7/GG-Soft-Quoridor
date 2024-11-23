import { Vector3 } from '@react-three/fiber';
import { Nodes } from '@src/components/game/Board.tsx';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { BufferGeometry, Material, Mesh, MeshStandardMaterial } from 'three';

export type Colors = 'RED' | 'GREEN' | 'BLUE' | 'PURPLE';
export type Positions = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';
export type CoordsType = { row: number; col: number };
export type CoordsWithPosType = CoordsType & { pos: Positions };

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
  handleClick: (coords: CoordsWithPosType) => void;
  handleOver: (coords: CoordsWithPosType) => void;
  handleOut: () => void;
};

const defaultColor = 'GRAY';

export const Block = forwardRef(
  (
    { geometry, position, name, scale, handleClick, handleOver, handleOut }: Props,
    ref: ForwardedRef<ForwardedBlock>,
  ) => {
    const { getCoordinatesByName } = useGrid();
    const { row, col } = useMemo(() => getCoordinatesByName(name), [getCoordinatesByName, name]);

    const colorRef = useRef<MeshStandardMaterial>(null!);
    const faceIdPositionMap = useRef<Record<number, Positions>>({
      8: 'RIGHT',
      9: 'BOTTOM',
      10: 'LEFT',
      11: 'TOP',
    });

    const mesh = useRef<Mesh>(null!);
    const out = useCallback(() => {
      colorRef.current.color.setColorName(defaultColor);
      handleOut();
    }, [handleOut]);

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        material: colorRef.current,
        name: mesh.current.name as BlockName,
        getCoordinates: () => ({ row, col }),
        changeColor: (color: Colors) => {
          colorRef.current.color.setColorName(color);
        },
      };
    }, [col, row]);

    return (
      <mesh
        ref={mesh}
        name={name}
        castShadow={true}
        receiveShadow={true}
        onClick={({ faceIndex }) => {
          if (!faceIndex) return;

          const pos = faceIdPositionMap.current[faceIndex];

          if (!pos) return; // Not a valid face, we don't care side faces

          handleClick({ row, col, pos });
        }}
        onPointerMove={({ faceIndex }) => {
          if (!faceIndex) return;

          const pos = faceIdPositionMap.current[faceIndex];

          if (!pos) return;

          handleOver({ row, col, pos });
        }}
        onPointerOut={out}
        onPointerMissed={out}
        geometry={geometry}
        position={position}
        scale={scale}
      >
        <meshStandardMaterial ref={colorRef} color={defaultColor} attach="material" />
      </mesh>
    );
  },
);
