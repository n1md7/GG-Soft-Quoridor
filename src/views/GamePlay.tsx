import { Canvas } from '@react-three/fiber';
import { Box } from '@src/components/game/Box';
import { Fox } from '@src/components/game/Fox';
import { Hamburger } from '@src/components/game/Hamburger';
import { Suspense } from 'react';
import '@styles/gameplay-view.scss';

type Props = {
  back: () => void;
};
export function Gameplay(props: Props) {
  return (
    <>
      <Canvas>
        {/*<Environment preset="warehouse" background />*/}
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense>
          <Hamburger scale={0.2} position={[0, -0.2, 0]} />
          <Box position={[2.5, 0.5, 0]} />
          <Fox scale={0.02} position-x={-3} />
        </Suspense>
      </Canvas>
      <div className="canvas-overlay">
        <div className="action">
          <button onClick={props.back} className="back-button">
            Back to Lobby
          </button>
        </div>
      </div>
    </>
  );
}
