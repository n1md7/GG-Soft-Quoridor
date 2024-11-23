import { Pawn } from '@src/components/game/pawns/Pawn.tsx';
import { ForwardedPawn, ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Material } from 'three';

type Props = {
  geometry: BufferGeometry;
  materials: {
    player: Material;
    opponent: Material;
  };
  playerClick: () => void;
};

export const Pawns = forwardRef(({ geometry, materials, playerClick }: Props, ref: ForwardedRef<ForwardedPawns>) => {
  const player = useRef<ForwardedPawn>(null!);
  const opponent = useRef<ForwardedPawn>(null!);

  useImperativeHandle(ref, () => {
    return {
      player: player.current,
      opponent: opponent.current,
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
        position={[7.649, 0.1, -4.243]}
        scale={[0.3, 0.5, 0.3]}
      />
      <Pawn
        ref={player}
        name="Pawn001"
        castShadow
        receiveShadow
        geometry={geometry}
        handleClick={playerClick}
        material={materials.player}
        position={[7.649, 0.1, 4.07]}
        scale={[0.3, 0.5, 0.3]}
      />
    </>
  );
});
