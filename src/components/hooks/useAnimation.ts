import { useCallback } from 'react';
import { Mesh } from 'three';

export const useAnimation = () => {
  const floatOneByCos = useCallback(
    (mesh: Mesh, min = 0.1, max = 0.6) =>
      (time: number) => {
        mesh.position.y = Math.cos(time + Math.PI) * min + max;
      },
    [],
  );

  const floatManyByCos = useCallback(
    (meshes: Mesh[], min = 0.1, max = 0.6) => {
      const animations = meshes.map((mesh) => floatOneByCos(mesh, min, max));

      return (time: number) => {
        animations.forEach((animation) => animation(time));
      };
    },
    [floatOneByCos],
  );

  return {
    floatOneByCos,
    floatManyByCos,
  };
};
