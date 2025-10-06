import { useEffect, useRef } from 'react';
import { DirectionalLight } from 'three';

export function DayLight() {
  const ref = useRef<DirectionalLight>(null);

  useEffect(() => {
    if (ref.current?.shadow?.camera) {
      const camera = ref.current.shadow.camera;
      camera.near = 0.1;
      camera.far = 50;
      camera.top = 15;
      camera.right = 15;
      camera.bottom = -15;
      camera.left = -15;
      camera.updateProjectionMatrix();
    }
  }, []);

  useEffect(() => {
    if (ref.current?.shadow) {
      ref.current.shadow.bias = -0.001;
      ref.current.shadow.normalBias = 0.02;
      ref.current.shadow.radius = 4;
    }
  }, []);

  return (
    <>
      {/* Main sun light - bright, white, from high angle */}
      <directionalLight
        ref={ref}
        castShadow
        color="#ffffff"
        intensity={5}
        position={[8, 12, 6]}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-top={15}
        shadow-camera-right={15}
        shadow-camera-bottom={-15}
        shadow-camera-left={-15}
      />

      {/* Ambient light for overall scene brightness */}
      <ambientLight color="#e6f3ff" intensity={0.6} />

      {/* Sky light - soft blue fill light from above */}
      <directionalLight color="#87ceeb" intensity={1.5} position={[0, 10, 0]} />

      {/* Bounce light - subtle warm light from opposite side */}
      <directionalLight color="#fff8dc" intensity={0.8} position={[-6, 4, -8]} />

      {/* Rim light for better object separation */}
      <directionalLight color="#ffffff" intensity={0.5} position={[8, 2, -6]} />
    </>
  );
}
