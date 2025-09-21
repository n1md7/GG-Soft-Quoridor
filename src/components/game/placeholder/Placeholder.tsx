import { CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { PositionMap } from '@src/components/game/walls/wall.type.ts';
import { useWallPosition } from '@src/components/hooks/useWallPosition.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { Color } from 'three';

type Props = {
  color: {
    default: Color;
    danger: Color;
  };
};

export const Placeholder = forwardRef(({ color }: Props, ref: ForwardedRef<ForwardedPlaceholder>) => {
  const mesh = useRef<Mesh>(null!);
  const material = useRef<MeshStandardMaterial>(null!);
  const { getDestinationFromCoords } = useWallPosition();

  const moveTo = useCallback(
    (coords: CoordsWithPosType) => {
      const { position, rotation } = getDestinationFromCoords(coords);
      mesh.current.position.copy(position);
      mesh.current.rotation.y = PositionMap[rotation].y;
    },
    [mesh, getDestinationFromCoords],
  );
  const setScaleFrom = useCallback(
    (scale: Vector3) => {
      mesh.current.scale.copy(scale);
      // Add a little bit to avoid z-fighting
      mesh.current.scale.multiply(new Vector3(1.01, 1.01, 1.01));
    },
    [mesh],
  );

  const show = useCallback(() => (mesh.current.visible = true), [mesh]);
  const hide = useCallback(() => (mesh.current.visible = false), [mesh]);
  const colorDanger = useCallback(() => (material.current.color = color.danger), [material, color.danger]);
  const colorDefault = useCallback(() => (material.current.color = color.default), [material, color.default]);
  const showColor = useCallback(
    (showDefault: boolean) => {
      material.current.color = showDefault ? color.default : color.danger;
    },
    [material, color],
  );

  useImperativeHandle(
    ref,
    () => ({
      mesh: mesh.current,
      moveTo,
      show,
      hide,
      colorDanger,
      colorDefault,
      setScaleFrom,
      showColor,
    }),
    [moveTo, show, hide, colorDanger, colorDefault, setScaleFrom, showColor],
  );

  useLayoutEffect(() => {
    if (mesh.current) mesh.current.visible = false;
  }, [mesh]);

  return (
    <mesh ref={mesh} position={[0, 1.0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial ref={material} color={color.default} transparent={true} opacity={0.2} />
    </mesh>
  );
});
