import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { ForwardedWall, ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { useWalls } from '@src/components/hooks/useWalls.ts';
import { Wall } from '@src/components/game/walls/Wall.tsx';
import { BufferGeometry, Material } from 'three';

type Props = {
  walls: {
    geometry: BufferGeometry;
    materials: {
      player: Material;
      opponent: Material;
    };
  };
  containers: {
    geometry: BufferGeometry;
    materials: {
      player: Material;
      opponent: Material;
    };
  };
};

export const Walls = forwardRef(({ walls, containers }: Props, ref: ForwardedRef<ForwardedWalls>) => {
  const { getIndexBy } = useWalls();

  const playerWalls = useRef<ForwardedWall[]>([] as ForwardedWall[]);
  const opponentWalls = useRef<ForwardedWall[]>([] as ForwardedWall[]);
  const wallsRefCallback = useCallback(
    (wall: ForwardedWall) => {
      if (!wall) return;

      if (getIndexBy(wall.name) > 9) {
        playerWalls.current.push(wall);
        return;
      }

      opponentWalls.current.push(wall);
    },
    [getIndexBy],
  );

  useImperativeHandle(ref, () => {
    return {
      player: {
        walls: playerWalls.current,
        hasWall: () => playerWalls.current.length > 0,
        getFrontWall: () => playerWalls.current[0],
        dropFrontWall: () => {
          playerWalls.current.shift();
        },
      },
      opponent: {
        walls: opponentWalls.current,
        hasWall: () => opponentWalls.current.length > 0,
        getFrontWall: () => opponentWalls.current[0],
        dropFrontWall: () => {
          opponentWalls.current.shift();
        },
      },
    };
  }, []);

  return (
    <>
      <Wall
        ref={wallsRefCallback}
        name="Wall000"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[6.796, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall001"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[7.036, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall002"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[7.276, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall003"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[7.516, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall004"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[7.756, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall005"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[7.996, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall006"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[8.236, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall007"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[8.476, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall008"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[8.716, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall009"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.opponent}
        position={[8.956, 0.587, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall010"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[6.796, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall011"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[7.036, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall012"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[7.276, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall013"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[7.516, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall014"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[7.756, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall015"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[7.996, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall016"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[8.236, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall017"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[8.476, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall018"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[8.716, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall019"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[8.956, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />

      <mesh
        name="Container000"
        castShadow
        receiveShadow
        geometry={containers.geometry}
        material={containers.materials.player}
        position={[6.029, -0.001, -1.3]}
        scale={[1.6, 0.25, 1.25]}
      />
      <mesh
        name="Container001"
        castShadow
        receiveShadow
        geometry={containers.geometry}
        material={containers.materials.opponent}
        position={[6.029, -0.001, 1.3]}
        scale={[1.6, 0.25, 1.25]}
      />
    </>
  );
});
