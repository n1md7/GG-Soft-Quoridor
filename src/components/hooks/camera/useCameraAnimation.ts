import { useThree } from '@react-three/fiber';
import { useCallback, useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as TWEEN from '@tweenjs/tween.js';
import { CameraPreset, CameraAnimationOptions } from './types';

interface UseCameraAnimationOptions extends CameraAnimationOptions {
  defaultDuration?: number;
  defaultEasing?: (t: number) => number;
}

export function useCameraAnimation(
  controlsRef: React.RefObject<OrbitControlsImpl>,
  options: UseCameraAnimationOptions = {},
) {
  const { camera } = useThree();
  const { defaultDuration = 2000, defaultEasing = TWEEN.Easing.Cubic.InOut } = options;

  const currentTween = useRef<TWEEN.Tween<any> | null>(null);

  const stopAnimation = useCallback(() => {
    if (currentTween.current) {
      currentTween.current.stop();
      currentTween.current = null;
    }
  }, []);

  const animateToPreset = useCallback(
    (targetPreset: CameraPreset, animationOptions: CameraAnimationOptions = {}): Promise<void> => {
      return new Promise((resolve) => {
        const { duration = defaultDuration, easing = defaultEasing, onComplete, onUpdate } = animationOptions;

        // Stop any existing animation
        stopAnimation();

        // Get current camera state
        const startPosition = {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        };

        const startRotation = {
          x: camera.rotation.x,
          y: camera.rotation.y,
          z: camera.rotation.z,
        };

        const startTarget = controlsRef.current?.target
          ? {
              x: controlsRef.current.target.x,
              y: controlsRef.current.target.y,
              z: controlsRef.current.target.z,
            }
          : { x: 0, y: 0, z: 0 };

        const startZoom = camera.zoom;

        // Create interpolation objects
        const positionTween = { ...startPosition };
        const rotationTween = { ...startRotation };
        const targetTween = { ...startTarget };
        const zoomTween = { zoom: startZoom };

        // Create the main tween
        currentTween.current = new TWEEN.Tween({
          position: positionTween,
          rotation: rotationTween,
          target: targetTween,
          zoom: zoomTween.zoom,
        })
          .to(
            {
              position: targetPreset.position,
              rotation: {
                x: targetPreset.rotation._x,
                y: targetPreset.rotation._y,
                z: targetPreset.rotation._z,
              },
              target: targetPreset.target,
              zoom: targetPreset.zoom,
            },
            duration,
          )
          .easing(easing)
          .onUpdate((values) => {
            // Update camera position
            camera.position.set(values.position.x, values.position.y, values.position.z);

            // Update camera rotation
            camera.rotation.set(values.rotation.x, values.rotation.y, values.rotation.z);

            // Update zoom
            camera.zoom = values.zoom;
            camera.updateProjectionMatrix();

            // Update controls target
            if (controlsRef.current) {
              controlsRef.current.target.set(values.target.x, values.target.y, values.target.z);
              controlsRef.current.update();
            }

            // Call progress callback
            onUpdate?.(values);
          })
          .onComplete(() => {
            currentTween.current = null;
            onComplete?.();
            resolve();
          })
          .start();
      });
    },
    [camera, controlsRef, defaultDuration, defaultEasing, stopAnimation],
  );

  const animateToPosition = useCallback(
    (position: { x: number; y: number; z: number }, animationOptions: CameraAnimationOptions = {}): Promise<void> => {
      const currentPreset: CameraPreset = {
        position,
        rotation: {
          isEuler: true,
          _x: camera.rotation.x,
          _y: camera.rotation.y,
          _z: camera.rotation.z,
          _order: 'XYZ',
        },
        target: controlsRef.current?.target
          ? {
              x: controlsRef.current.target.x,
              y: controlsRef.current.target.y,
              z: controlsRef.current.target.z,
            }
          : { x: 0, y: 0, z: 0 },
        zoom: camera.zoom,
      };

      return animateToPreset(currentPreset, animationOptions);
    },
    [camera, controlsRef, animateToPreset],
  );

  return {
    animateToPreset,
    animateToPosition,
    stopAnimation,
    isAnimating: () => currentTween.current !== null,
  };
}
