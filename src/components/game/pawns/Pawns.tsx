import { CoordsType } from '@src/components/game/block/block.type.ts';
import { Pawn } from '@src/components/game/pawns/Pawn.tsx';
import { AnimateToParams, ForwardedPawn, ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Material } from 'three';

type Props = {
  geometry: BufferGeometry;
  materials: {
    player: Material;
    opponent: Material;
  };
  playerClick: (coords: CoordsType) => void;
};

export const Pawns = forwardRef(({ geometry, materials, playerClick }: Props, ref: ForwardedRef<ForwardedPawns>) => {
  const player = useRef<ForwardedPawn>(null!);
  const opponent = useRef<ForwardedPawn>(null!);
  const { coords, getDestinationFromCoords, reset } = usePawnPosition();

  useImperativeHandle(ref, () => {
    return {
      player: {
        animateTo(params: AnimateToParams) {
          return player.current.moveTo(params);
        },
        animateToStartingPosition() {
          return player.current.moveTo(getDestinationFromCoords(coords.player));
        },
        setHighlight: player.current.setHighlight,
        coords: player.current.coords,
      },
      opponent: {
        animateTo(params: AnimateToParams) {
          return opponent.current.moveTo(params);
        },
        animateToStartingPosition() {
          return opponent.current.moveTo(getDestinationFromCoords(coords.opponent));
        },
        setHighlight: opponent.current.setHighlight,
        coords: opponent.current.coords,
      },
      reset() {
        reset();
        player.current.moveTo(getDestinationFromCoords(coords.player));
        opponent.current.moveTo(getDestinationFromCoords(coords.opponent));
      },
    };
  });

  return (
    <>
      <Pawn
        ref={opponent}
        name="Pawn000"
        castShadow
        receiveShadow
        geometry={geometry}
        material={materials.opponent}
        position={[7.649, 0.65, -4.243]}
        scale={[0.3, 0.5, 0.3]}
      />
      <Pawn
        ref={player}
        name="Pawn001"
        castShadow
        receiveShadow
        isPlayer
        geometry={geometry}
        handleClick={playerClick}
        material={materials.player}
        position={[7.649, 0.65, 4.07]}
        scale={[0.3, 0.5, 0.3]}
      />
    </>
  );
});
