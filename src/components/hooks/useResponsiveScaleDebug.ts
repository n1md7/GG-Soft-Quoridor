import { useControls } from 'leva';
import { useResponsiveScale } from './useResponsiveScale';

interface DebugConfig {
  enabled?: boolean;
  panelName?: string;
}

/**
 * Debug version of useResponsiveScale with Leva controls for testing
 */
export function useResponsiveScaleDebug(config: DebugConfig = {}) {
  const { enabled = process.env.NODE_ENV === 'development', panelName = 'Responsive Scale Debug' } = config;

  // Leva controls for testing different configurations
  const debugControls = enabled
    ? useControls(
        panelName,
        {
          breakpoint: { value: 800, min: 400, max: 1200, step: 10 },
          heightThreshold: { value: 650, min: 400, max: 900, step: 10 },
          minScale: { value: 0.7, min: 0.3, max: 1.0, step: 0.05 },
          maxScale: { value: 1.0, min: 0.8, max: 1.2, step: 0.05 },
          considerHeight: true,
          'Show Current Size': {
            value: false,
            render: (get) => get('Show Current Size'),
          },
          'Force Small Screen': {
            value: false,
            render: (get) => get('Force Small Screen'),
          },
        },
        {
          collapsed: true,
          color: '#ff6b6b',
        },
      )
    : {
        breakpoint: 800,
        heightThreshold: 650,
        minScale: 0.7,
        maxScale: 1.0,
        considerHeight: true,
        'Show Current Size': false,
        'Force Small Screen': false,
      };

  const responsiveScale = useResponsiveScale({
    breakpoint: debugControls.breakpoint,
    heightThreshold: debugControls.heightThreshold,
    minScale: debugControls.minScale,
    maxScale: debugControls.maxScale,
    considerHeight: debugControls.considerHeight,
  });

  // Force small screen simulation
  const finalScale = debugControls['Force Small Screen'] ? debugControls.minScale : responsiveScale.scale;

  const finalIsSmallScreen = debugControls['Force Small Screen'] ? true : responsiveScale.isSmallScreen;

  // Show current size info in console
  if (enabled && debugControls['Show Current Size']) {
    console.log(
      `📱 Screen: ${responsiveScale.dimensions.width}x${responsiveScale.dimensions.height}, Scale: ${finalScale.toFixed(2)}, Small: ${finalIsSmallScreen}`,
    );
  }

  return {
    ...responsiveScale,
    scale: finalScale,
    isSmallScreen: finalIsSmallScreen,
    style: {
      ...responsiveScale.style,
      transform: `scale(${finalScale})`,
    },
    debug: {
      enabled,
      controls: debugControls,
    },
  };
}
