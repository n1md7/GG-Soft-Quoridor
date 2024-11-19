import { MoveToParams, PositionMap } from '@src/components/game/Wall.tsx';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { Mesh } from 'three';
import { Color } from '@react-three/fiber';

type Props = {
  color?: Color;
};
export type ForwardedPlaceholder = {
  moveTo: (params: MoveToParams) => void;
  mesh: Mesh;
};
export const Placeholder = forwardRef(({ color = 'yellow' }: Props, ref: ForwardedRef<ForwardedPlaceholder>) => {
  const mesh = useRef<Mesh>(null!);

  const moveTo = ({ position, rotation }: MoveToParams) => {
    mesh.current.position.copy(position);
    mesh.current.rotation.y = PositionMap[rotation].y;
  };

  useImperativeHandle(ref, () => ({
    mesh: mesh.current,
    moveTo,
  }));

  return (
    <mesh ref={mesh} position={[0, 1.0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} transparent={true} opacity={0.2} />
    </mesh>
  );
});
