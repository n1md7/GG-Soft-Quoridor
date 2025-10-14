export interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface CameraRotation {
  isEuler: true;
  _x: number;
  _y: number;
  _z: number;
  _order: 'XYZ';
}

export interface CameraTarget {
  x: number;
  y: number;
  z: number;
}

export interface CameraPreset {
  position: CameraPosition;
  rotation: CameraRotation;
  target: CameraTarget;
  zoom: number;
}

export interface CameraPresets {
  [key: string]: CameraPreset;
}

export interface UseCameraControlsOptions {
  presets?: CameraPresets;
  defaultPreset?: string;
  enableDevControls?: boolean;
}

export interface CameraSnapshot {
  position: CameraPosition;
  rotation: CameraRotation;
  target: CameraTarget;
  zoom: number;
}
