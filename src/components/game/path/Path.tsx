import { Line } from '@react-three/drei';
import { Show } from '@src/components/utils/Show';
import { useControls } from 'leva';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Color, Vector3 } from 'three';

export type ForwardedPath = {
  show: (path: Vector3[]) => void;
  hide: () => void;
};

type Props = {
  color: Color;
  show: boolean;
  name: string;
  h?: number;
};

export const Path = forwardRef((props: Props, ref: ForwardedRef<ForwardedPath>) => {
  const [path, setPath] = useState<Vector3[]>([]);

  const [{ position, dashed, visible }, set] = useControls(
    props.name,
    () => ({
      position: [0, props.h || 0.07, 0],
      dashed: false,
      visible: props.show,
    }),
    {
      collapsed: true,
      color: '#e69191',
    },
  );

  useImperativeHandle(
    ref,
    () => ({
      show: (newPath: Vector3[]) => {
        setPath(newPath);
        set({ visible: true });
      },
      hide: () => {
        set({ visible: false });
      },
    }),
    [set],
  );

  return (
    <Show when={path.length > 0}>
      <Line visible={visible} points={path} color={props.color} lineWidth={4} dashed={dashed} position={position} />
    </Show>
  );
});
