import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { MoveToParams, PositionMap } from '@src/components/game/walls/wall.type.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { Color } from 'three';

type Props = {
  defaultColor: Color;
  dangerColor: Color;
};

export const Placeholder = forwardRef(
  ({ defaultColor, dangerColor }: Props, ref: ForwardedRef<ForwardedPlaceholder>) => {
    const mesh = useRef<Mesh>(null!);
    const material = useRef<MeshStandardMaterial>(null!);

    const moveTo = useCallback(
      ({ position, rotation }: MoveToParams) => {
        mesh.current.position.copy(position);
        mesh.current.rotation.y = PositionMap[rotation].y;
      },
      [mesh],
    );

    const show = useCallback(() => (mesh.current.visible = true), [mesh]);
    const hide = useCallback(() => (mesh.current.visible = false), [mesh]);
    const colorDanger = useCallback(() => (material.current.color = dangerColor), [material, dangerColor]);
    const colorDefault = useCallback(() => (material.current.color = defaultColor), [material, defaultColor]);

    useImperativeHandle(
      ref,
      () => ({
        mesh: mesh.current,
        moveTo,
        show,
        hide,
        colorDanger,
        colorDefault,
      }),
      [mesh, moveTo, show, hide, colorDanger, colorDefault],
    );

    useLayoutEffect(() => {
      if (mesh.current) mesh.current.visible = false;
    }, [mesh]);

    return (
      <mesh ref={mesh} position={[0, 1.0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial ref={material} color={defaultColor} transparent={true} opacity={0.2} />
      </mesh>
    );
  },
);
