import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { DirectionalLight } from 'three';

export function Lights() {
  const { color, position, intensity, mapSize, bias, normalBias, radius } = useControls(
    'Directional Light',
    {
      color: {
        value: '#ffb366',
        label: 'Color',
        hint: 'Evening sun color',
      },
      intensity: {
        value: 3.5,
        min: 0,
        max: 50,
        step: 0.1,
      },
      position: {
        value: [5, 6, 1],
        step: 0.1,
        joystick: 'invertY',
      },
      mapSize: {
        value: [2048, 2048],
        step: 1,
        max: 10000,
        min: 0,
        label: 'Shadow Map Size',
        hint: 'Width and height of the shadow map',
      },
      bias: {
        value: -0.002,
        min: -0.01,
        max: 0.01,
        step: 0.0001,
        label: 'Shadow Bias',
        hint: 'Fixes shadow acne/stripes',
      },
      normalBias: {
        value: 0.04,
        min: 0,
        max: 0.1,
        step: 0.001,
        label: 'Normal Bias',
        hint: 'Additional bias based on surface normal',
      },
      radius: {
        value: 6,
        min: 1,
        max: 20,
        step: 1,
        label: 'Shadow Radius',
        hint: 'Shadow blur/softness',
      },
    },
    {
      collapsed: true,
      color: '#70a6dc',
    },
  );

  const { near, far, top, right, bottom, left } = useControls(
    'Shadow Camera',
    {
      near: {
        value: 0.1,
        min: 0.1,
        max: 20,
        step: 0.1,
      },
      far: {
        value: 50,
        min: 10,
        max: 100,
        step: 1,
      },
      top: {
        value: 15,
        min: 1,
        max: 50,
        step: 1,
      },
      right: {
        value: 15,
        min: 1,
        max: 50,
        step: 1,
      },
      bottom: {
        value: -15,
        min: -50,
        max: -1,
        step: 1,
      },
      left: {
        value: -15,
        min: -50,
        max: -1,
        step: 1,
      },
    },
    {
      collapsed: true,
      color: '#70a6dc',
    },
  );

  const ref = useRef<DirectionalLight>(null);

  useEffect(() => {
    if (ref.current?.shadow?.camera) {
      const camera = ref.current.shadow.camera;
      camera.near = near;
      camera.far = far;
      camera.top = top;
      camera.right = right;
      camera.bottom = bottom;
      camera.left = left;
      camera.updateProjectionMatrix();
    }
  }, [near, far, top, right, bottom, left]);

  useEffect(() => {
    if (ref.current?.shadow) {
      ref.current.shadow.bias = bias;
      ref.current.shadow.normalBias = normalBias;
      ref.current.shadow.radius = radius;
    }
  }, [bias, normalBias, radius]);

  const { ambientIntensity, ambientColor, fillLightIntensity } = useControls('Ambient Lighting', {
    ambientIntensity: {
      value: 1.8,
      min: 0,
      max: 3,
      step: 0.1,
      label: 'Ambient Intensity',
      hint: 'Overall scene brightness',
    },
    ambientColor: {
      value: '#c36120',
      label: 'Ambient Color',
      hint: 'Cool blue-gray for evening atmosphere',
    },
    fillLightIntensity: {
      value: 1.8,
      min: 0,
      max: 2,
      step: 0.1,
      label: 'Fill Light',
      hint: 'Brightens shadows from opposite side',
    },
  });

  return (
    <>
      <directionalLight
        ref={ref}
        castShadow
        color={color}
        intensity={intensity}
        position={position}
        shadow-mapSize={mapSize}
        shadow-camera-near={near}
        shadow-camera-far={far}
        shadow-camera-top={top}
        shadow-camera-right={right}
        shadow-camera-bottom={bottom}
        shadow-camera-left={left}
      />
      <ambientLight color={ambientColor} intensity={ambientIntensity} />
      <directionalLight color="#87ceeb" intensity={fillLightIntensity} position={[-8, 4, -4]} />
    </>
  );
}
