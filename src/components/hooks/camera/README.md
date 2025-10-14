# Camera Hooks

A comprehensive camera control system for Three.js React applications with preset management, live logging, and developer tools.

## Features

- 🎯 **Camera Presets**: Store and apply camera positions, rotations, targets, and zoom levels
- 📸 **Live Snapshot**: Capture current camera state with one click
- 🎥 **Live Logging**: Real-time camera updates during interaction
- 🛠️ **Dev Controls**: Leva UI integration for development and debugging
- 🔧 **OrbitControls Integration**: Seamless integration with Three.js OrbitControls

## Usage

### Basic Setup

```tsx
import { useCameraControls } from '@src/components/hooks/camera';

function MyScene() {
  const { controlsRef } = useCameraControls({
    presets: {
      default: {
        position: { x: 0, y: 5, z: 5 },
        rotation: { isEuler: true, _x: -0.7, _y: 0, _z: 0, _order: 'XYZ' },
        target: { x: 0, y: 0, z: 0 },
        zoom: 1,
      },
    },
    defaultPreset: 'default',
    enableDevControls: true,
  });

  return (
    <OrbitControls
      ref={controlsRef}
      // ... your orbit controls props
    />
  );
}
```

### Advanced Usage

```tsx
import { useCameraControls, useCameraSnapshot } from '@src/components/hooks/camera';

function AdvancedScene() {
  const { controlsRef, applyPreset, setCameraToPreset } = useCameraControls({
    presets: CAMERA_PRESETS,
    enableDevControls: process.env.NODE_ENV === 'development',
  });

  const { captureSnapshot } = useCameraSnapshot(controlsRef, {
    onSnapshot: (snapshot) => {
      // Handle snapshot data
      console.log('Camera captured:', snapshot);
    },
  });

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <button onClick={() => applyPreset('cinematic')}>Apply Cinematic View</button>
      <button onClick={captureSnapshot}>Capture Current Position</button>
    </>
  );
}
```

## API Reference

### `useCameraControls(options)`

Main hook for camera control management.

**Options:**

- `presets?: CameraPresets` - Camera preset configurations
- `defaultPreset?: string` - Name of preset to apply on mount
- `enableDevControls?: boolean` - Enable Leva dev controls (default: true)

**Returns:**

- `controlsRef: RefObject<OrbitControlsImpl>` - Ref for OrbitControls
- `captureSnapshot: () => CameraSnapshot` - Capture current camera state
- `setCameraToPreset: (preset: CameraPreset) => void` - Apply preset directly
- `applyPreset: (name: string) => void` - Apply preset by name
- `presets: CameraPresets` - Current preset configurations

### `useCameraSnapshot(controlsRef, options)`

Hook for camera snapshot functionality.

**Options:**

- `onSnapshot?: (snapshot: CameraSnapshot) => void` - Callback on snapshot
- `copyToClipboard?: boolean` - Copy to clipboard (default: true)
- `logToConsole?: boolean` - Log to console (default: true)

**Returns:**

- `captureSnapshot: () => CameraSnapshot` - Capture current state
- `createLiveLogger: (enabled: boolean) => (() => void) | undefined` - Create live logger

## Types

### `CameraPreset`

```tsx
interface CameraPreset {
  position: { x: number; y: number; z: number };
  rotation: {
    isEuler: true;
    _x: number;
    _y: number;
    _z: number;
    _order: 'XYZ';
  };
  target: { x: number; y: number; z: number };
  zoom: number;
}
```

### `CameraSnapshot`

Same as `CameraPreset` - represents the current camera state.

## Development Workflow

1. **Enable dev controls** in your scene
2. **Use OrbitControls** to position camera naturally
3. **Toggle "Live Log Camera Changes"** to see real-time updates
4. **Click "Snapshot Current"** when you find the perfect position
5. **Copy the output** and update your presets
6. **Disable dev controls** for production

## Best Practices

- Keep presets organized with descriptive names
- Disable dev controls in production builds
- Use meaningful preset names (e.g., 'gameplay', 'menu', 'cinematic')
- Test presets on different screen sizes and devices
- Consider smooth transitions between presets for better UX
