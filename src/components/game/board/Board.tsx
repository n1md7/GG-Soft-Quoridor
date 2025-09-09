import { Blocks } from '@src/components/game/block/Blocks.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Path } from '@src/components/game/path/Path.tsx';
import { Pawns } from '@src/components/game/pawns/Pawns.tsx';
import { Walls } from '@src/components/game/walls/Walls.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
import { useSettings } from '@src/components/hooks/useSettings.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';

export const Board = () => {
  const game = useGame();
  const { settings } = useSettings();
  const [marketOpen, setMarketOpen] = useState(false);

  useControls('Market', {
    market: {
      value: true,
      options: [true, false],
      transient: false,
      onChange: (value: boolean) => {
        setMarketOpen(value);
      },
    },
  });
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

  useEffect(() => {
    game.modes.setMode(settings.difficulty);
    game.player.setName(settings.playerName);
    game.player.setAvatar(settings.playerAvatar);
    game.computer.setName('Computer');
    game.computer.setAvatar('Avatar-CPU');

    setMarketOpen(true);
  }, [game.computer, game.modes, game.player, settings.difficulty, settings.playerAvatar, settings.playerName]);

  useEffect(() => {
    if (!game.model.pawns.current) return;

    game.model.pawns.current.player.animateToStartingPosition();
    game.model.pawns.current.opponent.animateToStartingPosition();
  }, [game.model.pawns]);

  useEffect(() => {
    if (game.model.walls.current) {
      if (!game.model.walls.current.player.hasWall()) return;

      game.model.walls.current.placeholder.wall.setScaleFrom(game.model.walls.current.player.getFrontWall()!.scale);
    }
  }, [game.model.walls]);

  return (
    <>
      <Show when={marketOpen}>
        <Market onClose={() => setMarketOpen(false)} />
      </Show>
      <group dispose={null}>
        <Path />
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
          material={game.model.nodes.Plate001.material}
          position={[7.629, 0.051, 4.179]}
          scale={[1.6, 0.05, 1.6]}
        />
        <mesh
          name="Plate000"
          castShadow
          receiveShadow
          geometry={game.model.nodes.Plate000.geometry}
          material={game.model.nodes.Plate000.material}
          position={[7.629, 0.051, -4.181]}
          scale={[1.6, 0.05, 1.6]}
        />
      </group>
    </>
  );
};
