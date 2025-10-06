import { Blocks } from '@src/components/game/block/Blocks.tsx';
import { Path } from '@src/components/game/path/Path.tsx';
import { Pawns } from '@src/components/game/pawns/Pawns.tsx';
import { Walls } from '@src/components/game/walls/Walls.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
import { useMaterialEnhancements } from '@src/components/hooks/useMaterialEnhancements.ts';
import { opponentPathColor, playerPathColor } from '@src/config/highlight.config.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { button, useControls } from 'leva';
import { useEffect } from 'react';

export const Board = () => {
  const game = useGame();

  // Enhance all materials with better PBR properties
  useMaterialEnhancements(game.model.materials);

  useControls('Board', {
    wireframe: {
      value: false,
      options: [true, false],
      transient: false,
      onChange: (value: boolean) => {
        game.model.showWireframes(value);
      },
    },
  });

  useControls('Inventory', () => ({
    'Path Vision': button(() => {
      game.powers.use(PowerEnum.ShortestPath);
    }),
    'Extra Wall': button(() => {
      game.powers.use(PowerEnum.ExtraWall);
    }),
    'Undo Move': button(() => {
      game.powers.use(PowerEnum.Undo);
    }),
    'Block Opponent': button(() => {
      game.powers.use(PowerEnum.BlockMove);
    }),
  }));

  useEffect(() => {
    if (!game.model.pawns.current) return;

    game.model.pawns.current.player.animateToStartingPosition();
    game.model.pawns.current.opponent.animateToStartingPosition();
  }, [game.model.pawns]);

  useEffect(() => {
    if (game.model.walls.current) {
      if (!game.model.walls.current.player.hasWall()) return;

      console.info(`Player walls: `, game.model.walls.current.player.walls);

      game.model.walls.current.placeholder.wall.setScaleFrom(game.model.walls.current.player.getWall()!.scale);
    }
  }, [game.model.walls]);

  return (
    <group dispose={null}>
      <Path h={0.07} name="Path Opponent" color={opponentPathColor} show={true} ref={game.model.path.opponent} />
      <Path h={0.08} name="Path Player" color={playerPathColor} show={true} ref={game.model.path.player} />
      <Blocks
        ref={game.model.blocks}
        material={game.model.materials.BlockMaterial}
        geometry={game.model.nodes.Block000.geometry}
        handleClick={game.player.handleBlockPointerClick}
        handleOver={game.player.handleBlockPointerOver}
        handleOut={game.player.handleBlockPointerOut}
      />
      <Walls
        ref={game.model.walls}
        walls={{
          geometry: game.model.nodes.Wall000.geometry,
          materials: {
            player: game.model.materials.WallWhiteMaterial,
            opponent: game.model.materials.WallBlackMaterial,
          },
        }}
        containers={{
          geometry: game.model.nodes.Container000.geometry,
          materials: {
            player: game.model.materials.ContainerMaterial,
            opponent: game.model.materials.ContainerMaterial,
          },
        }}
      />
      <Pawns
        ref={game.model.pawns}
        geometry={game.model.nodes.Pawn000.geometry}
        materials={{
          player: game.model.materials.PawnWhiteMaterial,
          opponent: game.model.materials.PawnBlackMaterial,
        }}
        playerClick={game.player.handlePawnPointerClick}
      />
      <mesh
        name="Platform"
        castShadow
        receiveShadow
        geometry={game.model.nodes.Platform.geometry}
        material={game.model.materials.PlatformMaterial}
        position={[0, -0.003, 0]}
        scale={[6, 0.25, 6]}
      />
      <mesh
        name="Plate001"
        castShadow
        receiveShadow
        geometry={game.model.nodes.Plate001.geometry}
        material={game.model.materials.PlatformMaterial}
        position={[7.629, 0.251, 4.179 + 0.22]}
        scale={[1.6, 0.25, 1.6]}
      />
      <mesh
        name="Plate000"
        castShadow
        receiveShadow
        geometry={game.model.nodes.Plate000.geometry}
        material={game.model.materials.PlatformMaterial}
        position={[7.629, 0.251, -4.181 - 0.22]}
        scale={[1.6, 0.25, 1.6]}
      />
    </group>
  );
};
