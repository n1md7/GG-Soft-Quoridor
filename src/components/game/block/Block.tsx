import { Vector3 } from '@react-three/fiber';
import {
  BlockName,
  Colors,
  CoordsWithIsHighlightedType,
  CoordsWithPosType,
  ForwardedBlock,
  Positions,
} from '@src/components/game/block/block.type.ts';
import { Overlay } from '@src/components/game/block/Overlay.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
import { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { BufferGeometry, Color, Material, Mesh, MeshStandardMaterial } from 'three';

type Props = {
  geometry: BufferGeometry;
  position: Vector3;
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name: BlockName;
  material?: Material | Material[];
  scale?: Vector3;
  handleClick: (coords: CoordsWithIsHighlightedType) => void;
  handleOver: (coords: CoordsWithPosType) => void;
  handleOut: () => void;
};

const defaultColor = new Color('GRAY');

export const Block = forwardRef(
  (
    { geometry, position, name, scale, handleClick, handleOver, handleOut }: Props,
    ref: ForwardedRef<ForwardedBlock>,
  ) => {
    const {
      grid: { getCoordsByName },
    } = useGame();
    const { row, col } = useMemo(() => getCoordsByName(name), [getCoordsByName, name]);
    const [hoveredPosition, setHoveredPosition] = useState<Positions | null>(null);

    const colorRef = useRef<MeshStandardMaterial>(null!);
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
        changeColor: (color: Colors) => {
          colorRef.current.color.set(color === 'DEFAULT' ? defaultColor : new Color(color));
        },
      };
    }, [col, row, mesh]);

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

          handleClick({
            row,
            col,
            pos,
            isHighlighted: !colorRef.current.color.equals(defaultColor),
          });
        }}
        onPointerMove={({ stopPropagation, faceIndex }) => {
          stopPropagation();

          if (!faceIndex) return;

          const pos = faceIdPositionMap.current[faceIndex];

          if (!pos) return;

          setHoveredPosition(pos);
          handleOver({ row, col, pos });
        }}
        onPointerOut={() => {
          setHoveredPosition(null);
          handleOut();
        }}
        onPointerMissed={() => {
          setHoveredPosition(null);
          handleOut();
        }}
        geometry={geometry}
        position={position}
        scale={scale}
      >
        <meshStandardMaterial
          ref={colorRef}
          color={defaultColor}
          attach="material"
          metalness={0.1}
          roughness={0.8}
          envMapIntensity={2.0}
        />
        <Overlay hoveredPosition={hoveredPosition} />
      </mesh>
    );
  },
);
