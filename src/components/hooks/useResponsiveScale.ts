import { useEffect, useState } from 'react';

interface ResponsiveScaleConfig {
  /** Breakpoint where scaling starts (default: 768px) */
  breakpoint?: number;
  /** Minimum scale factor (default: 0.6) */
  minScale?: number;
  /** Maximum scale factor (default: 1.0) */
  maxScale?: number;
  /** Height threshold for small screens (default: 600px) */
  heightThreshold?: number;
  /** Enable scaling based on both width and height (default: true) */
  considerHeight?: boolean;
  /** Debounce delay for resize events (default: 100ms) */
  debounceDelay?: number;
}

interface ResponsiveScaleResult {
  /** Current scale factor (0.6 - 1.0) */
  scale: number;
  /** Whether the screen is considered small */
  isSmallScreen: boolean;
  /** Current window dimensions */
  dimensions: {
    width: number;
    height: number;
  };
  /** CSS transform string ready to use */
  transform: string;
  /** CSS style object with transform and transform-origin */
  style: {
    transform: string;
    transformOrigin: string;
  };
}

export function useResponsiveScale(config: ResponsiveScaleConfig = {}): ResponsiveScaleResult {
  const {
    breakpoint = 768,
    minScale = 0.6,
    maxScale = 1.0,
    heightThreshold = 600,
    considerHeight = true,
    debounceDelay = 100,
  } = config;

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  const [scale, setScale] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateScale = () => {
      const { innerWidth: width, innerHeight: height } = window;

      setDimensions({ width, height });

      // Determine if screen is small based on width and optionally height
      const isWidthSmall = width < breakpoint;
      const isHeightSmall = considerHeight ? height < heightThreshold : false;
      const smallScreen = isWidthSmall || isHeightSmall;

      setIsSmallScreen(smallScreen);

      if (!smallScreen) {
        setScale(maxScale);
        return;
      }

      // Calculate scale based on screen dimensions
      // For width-based scaling
      const widthScale = width < breakpoint ? Math.max(minScale, (width / breakpoint) * maxScale) : maxScale;

      // For height-based scaling (if enabled)
      const heightScale =
        considerHeight && height < heightThreshold
          ? Math.max(minScale, (height / heightThreshold) * maxScale)
          : maxScale;

      // Use the smaller scale factor for better fit
      const calculatedScale = Math.min(widthScale, heightScale);

      // Ensure scale is within bounds
      const finalScale = Math.max(minScale, Math.min(maxScale, calculatedScale));

      setScale(finalScale);
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScale, debounceDelay);
    };

    // Initial calculation
    updateScale();

    // Add resize listener
    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, [breakpoint, minScale, maxScale, heightThreshold, considerHeight, debounceDelay]);

  const transform = `scale(${scale})`;
  const style = {
    transform,
    transformOrigin: 'top right', // Good for top-right positioned elements
  };

  return {
    scale,
    isSmallScreen,
    dimensions,
    transform,
    style,
  };
}
