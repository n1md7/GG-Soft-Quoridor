import { useThree } from '@react-three/fiber';
import { useCallback } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CameraSnapshot } from './types';

interface UseCameraSnapshotOptions {
  onSnapshot?: (snapshot: CameraSnapshot) => void;
  copyToClipboard?: boolean;
  logToConsole?: boolean;
}

export function useCameraSnapshot(
  controlsRef: React.RefObject<OrbitControlsImpl>,
  options: UseCameraSnapshotOptions = {},
) {
  const { camera } = useThree();
  const { onSnapshot, copyToClipboard = true, logToConsole = true } = options;

  const captureSnapshot = useCallback((): CameraSnapshot => {
    const pos = camera.position;
    const rot = camera.rotation;
    const target = controlsRef.current?.target || { x: 0, y: 0, z: 0 };

    const snapshot: CameraSnapshot = {
      position: { x: pos.x, y: pos.y, z: pos.z },
      rotation: {
        isEuler: true,
        _x: rot.x,
        _y: rot.y,
        _z: rot.z,
        _order: 'XYZ',
      },
      target: { x: target.x, y: target.y, z: target.z },
      zoom: camera.zoom,
    };

    if (logToConsole) {
      console.log('📸 Camera Snapshot:', JSON.stringify(snapshot, null, 2));
    }

    if (copyToClipboard) {
      navigator.clipboard?.writeText(JSON.stringify(snapshot, null, 2));
    }

    onSnapshot?.(snapshot);

    return snapshot;
  }, [camera, controlsRef, onSnapshot, copyToClipboard, logToConsole]);

  const createLiveLogger = useCallback(
    (enabled: boolean) => {
      if (!controlsRef.current || !enabled) return undefined;

      const controls = controlsRef.current;
      let timeoutId: NodeJS.Timeout;

      const logCameraState = () => {
        const pos = camera.position;
        const rot = camera.rotation;
        const target = controlsRef.current?.target || { x: 0, y: 0, z: 0 };

        const snapshot: CameraSnapshot = {
          position: { x: pos.x, y: pos.y, z: pos.z },
          rotation: {
            isEuler: true,
            _x: rot.x,
            _y: rot.y,
            _z: rot.z,
            _order: 'XYZ',
          },
          target: { x: target.x, y: target.y, z: target.z },
          zoom: camera.zoom,
        };

        if (logToConsole) {
          console.log('🎥 Live Camera Update:', JSON.stringify(snapshot, null, 2));
        }
      };

      const handleChange = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(logCameraState, 100);
      };

      controls.addEventListener('change', handleChange);

      return () => {
        controls.removeEventListener('change', handleChange);
        clearTimeout(timeoutId);
      };
    },
    [camera, controlsRef, logToConsole],
  );

  return {
    captureSnapshot,
    createLiveLogger,
  };
}
