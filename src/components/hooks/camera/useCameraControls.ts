import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { button, useControls } from 'leva';
import { CameraPreset, CameraPresets, UseCameraControlsOptions } from './types';
import { useCameraSnapshot } from './useCameraSnapshot';

const DEFAULT_PRESETS: CameraPresets = {
  optimal: {
    position: { x: 0, y: 5, z: 5 },
    rotation: { isEuler: true, _x: -0.7, _y: 0, _z: 0, _order: 'XYZ' },
    target: { x: 0, y: 0, z: 0 },
    zoom: 1,
  },
};

export function useCameraControls(options: UseCameraControlsOptions = {}) {
  const { camera } = useThree();
  const { presets = DEFAULT_PRESETS, defaultPreset = 'optimal', enableDevControls = true } = options;

  const controlsRef = useRef<OrbitControlsImpl>(null);

  const { captureSnapshot, createLiveLogger } = useCameraSnapshot(controlsRef);

  const setCameraToPreset = useCallback(
    (preset: CameraPreset) => {
      camera.position.set(preset.position.x, preset.position.y, preset.position.z);
      camera.rotation.set(preset.rotation._x, preset.rotation._y, preset.rotation._z);
      camera.zoom = preset.zoom;
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.target.set(preset.target.x, preset.target.y, preset.target.z);
        controlsRef.current.update();
      }
    },
    [camera],
  );

  const applyPreset = useCallback(
    (presetName: string) => {
      const preset = presets[presetName];
      if (preset) {
        setCameraToPreset(preset);
      }
    },
    [presets, setCameraToPreset],
  );

  // Dev controls for camera manipulation
  const devControls = enableDevControls
    ? useControls(
        'Camera Dev Controls',
        {
          enableLiveLogging: {
            value: false,
            label: 'Live Log Camera Changes',
          },
          'Snapshot Current': button(captureSnapshot),
          ...Object.keys(presets).reduce(
            (acc, presetName) => ({
              ...acc,
              [`Apply ${presetName}`]: button(() => applyPreset(presetName)),
            }),
            {},
          ),
        },
        {
          collapsed: false,
          color: '#4f9eff',
        },
      )
    : { enableLiveLogging: false };

  // Live logging effect
  useEffect(() => {
    if (!enableDevControls || !devControls.enableLiveLogging) return;

    return createLiveLogger(true);
  }, [enableDevControls, devControls.enableLiveLogging, createLiveLogger]);

  // Apply default preset on mount
  useEffect(() => {
    if (defaultPreset && presets[defaultPreset]) {
      setCameraToPreset(presets[defaultPreset]);
    }
  }, [defaultPreset, presets, setCameraToPreset]);

  return {
    controlsRef,
    captureSnapshot,
    setCameraToPreset,
    applyPreset,
    presets,
  };
}
