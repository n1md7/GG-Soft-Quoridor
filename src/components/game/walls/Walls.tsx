import { Placeholder } from '@src/components/game/placeholder/Placeholder.tsx';
import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { Wall } from '@src/components/game/walls/Wall.tsx';
import { ForwardedWall, ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { useWalls } from '@src/components/hooks/useWalls.ts';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Color, Material } from 'three';

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
  const placeholderWall = useRef<ForwardedPlaceholder>(null!);

  const player = useWalls();
  const opponent = useWalls();
  const extraWall = useRef<ForwardedWall>(null!);

  useImperativeHandle(ref, () => {
    return {
      placeholder: {
        wall: placeholderWall.current,
      },
      player: {
        walls: player.walls,
        undoWallIndex: () => player.decrementIndex(),
        hasWall: () => player.hasWalls(),
        getWall: () => player.getWall(),
        dropWall: () => player.incrementIndex(),
        addExtraWall: () => {
          if (extraWall.current) {
            player.getUnusedWalls().forEach((wall) => wall.moveToAxisX(0.24));
            player.callback(extraWall.current); // Register the extra wall
            extraWall.current.moveToAxisX(0.24);
            extraWall.current.show();
          }
        },
      },
      opponent: {
        walls: opponent.walls,
        undoWallIndex: () => opponent.decrementIndex(),
        hasWall: () => opponent.hasWalls(),
        getWall: () => opponent.getWall(),
        dropWall: () => opponent.incrementIndex(),
      },
      /**
       * Reset both player's and opponent's walls
       */
      reset: () => {
        player.walls.forEach((wall) => wall.moveToOrigin());
        opponent.walls.forEach((wall) => wall.moveToOrigin());

        player.resetIndex();
        opponent.resetIndex();

        if (extraWall.current) {
          extraWall.current.moveToOrigin(() => {
            extraWall.current.hide();
          });
        }
      },
    };
  }, [opponent, player]);

  return (
    <>
      <Placeholder
        ref={placeholderWall}
        color={{
          default: new Color(0x00ff00),
          danger: new Color(0xff0000),
        }}
      />
      <Wall
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={opponent.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
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
        ref={player.callback}
        name="Wall019"
        castShadow
        receiveShadow
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[8.956, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        hidden
        castShadow
        receiveShadow
        name="Wall020"
        ref={extraWall}
        geometry={walls.geometry}
        material={walls.materials.player}
        position={[9.196, 0.587, 1.299]}
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
