import { CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { useModel } from '@src/components/hooks/useModel.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { useWallPosition } from '@src/components/hooks/useWallPosition.ts';
import { useCallback } from 'react';

type Options = {
  path: string;
};

export const useGame = ({ path }: Options) => {
  const {
    isPawnMode,
    setWallMode,
    toggleMode,
    assertBlockByCoords,
    canAddWall,
    addWallByCoords,
    pawns,
    nodes,
    materials,
    walls,
    blocks,
    showWireframes,
  } = useModel({ path });

  const wallPosition = useWallPosition();
  const pawnPosition = usePawnPosition();

  const handleBlockClick = useCallback(
    (coords: CoordsWithPosType) => {
      if (isPawnMode()) {
        pawns.current.player.animateTo(pawnPosition.getDestinationFromCoords(coords));

        return setWallMode(); // Activate wall mode
      }

      const wall = walls.current.player.getFrontWall();
      if (!wall) return console.info('Out of walls');

      assertBlockByCoords(coords);

      if (!canAddWall(coords)) return console.info('Cannot add wall here');

      addWallByCoords(wall, coords);
      wall.moveTo(wallPosition.getDestinationFromCoords(coords));
      walls.current.player.dropFrontWall();
    },
    [
      isPawnMode,
      walls,
      assertBlockByCoords,
      canAddWall,
      addWallByCoords,
      wallPosition,
      pawns,
      pawnPosition,
      setWallMode,
    ],
  );

  const handleBlockOver = useCallback(
    (coords: CoordsWithPosType) => {
      if (isPawnMode()) return;

      assertBlockByCoords(coords);

      switch (canAddWall(coords)) {
        case true:
          walls.current.placeholder.colorDefault();
          break;
        case false:
          walls.current.placeholder.colorDanger();
          break;
      }

      walls.current.placeholder.show();
      walls.current.placeholder.moveTo(wallPosition.getDestinationFromCoords(coords));
    },
    [isPawnMode, assertBlockByCoords, canAddWall, walls, wallPosition],
  );

  const handleBlockOut = useCallback(() => {
    walls.current.placeholder.hide();
  }, [walls]);

  const handlePawnClick = useCallback(() => {
    toggleMode();
    // TODO highlight possible moves
    console.info('Pawn clicked');
  }, [toggleMode]);

  return {
    handleBlockClick,
    handleBlockOver,
    handleBlockOut,
    handlePawnClick,
    pawnPosition,
    wallPosition,
    isPawnMode,
    setWallMode,
    toggleMode,
    assertBlockByCoords,
    canAddWall,
    addWallByCoords,
    pawns,
    nodes,
    materials,
    walls,
    blocks,
    showWireframes,
  };
};
