import { Block } from '@src/components/game/block/Block.tsx';
import { CoordsWithPosType, ForwardedBlock, ForwardedBlocks } from '@src/components/game/block/block.type.ts';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Material } from 'three';

type Props = {
  geometry: BufferGeometry;
  material: Material;
  handleClick: (coords: CoordsWithPosType) => void;
  handleOver: (coords: CoordsWithPosType) => void;
  handleOut: () => void;
};

export const Blocks = forwardRef(
  ({ geometry, material, handleOver, handleOut, handleClick }: Props, ref: ForwardedRef<ForwardedBlocks>) => {
    const { mapByName } = useGrid();

    const blocks = useRef<ForwardedBlock[]>([] as ForwardedBlock[]);
    const blocksRefCallback = useCallback(
      (block: ForwardedBlock) => {
        if (!block) return;

        blocks.current.push(block);
        mapByName(block);
      },
      [mapByName],
    );

    useImperativeHandle(ref, () => {
      return {
        items: blocks.current,
        setWireframes: (show: boolean) => {
          blocks.current.forEach((block) => (block.material.wireframe = show));
        },
      };
    }, [blocks]);

    return (
      <>
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block000"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block001"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block002"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block003"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block004"
          geometry={geometry}
          material={material}
          position={[0, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block005"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block006"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block007"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block008"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, 4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block009"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block010"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block011"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block012"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block013"
          geometry={geometry}
          material={material}
          position={[0, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block014"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block015"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block016"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block017"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, 3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block018"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block019"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block020"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block021"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block022"
          geometry={geometry}
          material={material}
          position={[0, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block023"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block024"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block025"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block026"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, 2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block027"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block028"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block029"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block030"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block031"
          geometry={geometry}
          material={material}
          position={[0, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block032"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block033"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block034"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block035"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, 1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block036"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block037"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block038"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block039"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block040"
          geometry={geometry}
          material={material}
          position={[0, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block041"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block042"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block043"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block044"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, 0]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block045"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block046"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block047"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block048"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block049"
          geometry={geometry}
          material={material}
          position={[0, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block050"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block051"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block052"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block053"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, -1.2]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block054"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block055"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block056"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block057"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block058"
          geometry={geometry}
          material={material}
          position={[0, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block059"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block060"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block061"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block062"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, -2.4]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block063"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block064"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block065"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block066"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block067"
          geometry={geometry}
          material={material}
          position={[0, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block068"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block069"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block070"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block071"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, -3.6]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block072"
          geometry={geometry}
          material={material}
          position={[-4.8, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block073"
          geometry={geometry}
          material={material}
          position={[-3.6, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block074"
          geometry={geometry}
          material={material}
          position={[-2.4, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block075"
          geometry={geometry}
          material={material}
          position={[-1.2, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block076"
          geometry={geometry}
          material={material}
          position={[0, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block077"
          geometry={geometry}
          material={material}
          position={[1.2, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block078"
          geometry={geometry}
          material={material}
          position={[2.4, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block079"
          geometry={geometry}
          material={material}
          position={[3.6, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
        <Block
          ref={blocksRefCallback}
          handleClick={handleClick}
          handleOver={handleOver}
          handleOut={handleOut}
          name="Block080"
          geometry={geometry}
          material={material}
          position={[4.8, 0.55, -4.8]}
          scale={[0.5, 0.15, 0.5]}
        />
      </>
    );
  },
);
