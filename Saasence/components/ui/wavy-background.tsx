"use client";

import { cn } from "@/lib/utils"; // Assuming this path is correct
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { createNoise3D } from "simplex-noise";

// --- Type for the noise function returned by createNoise3D ---
type Noise3DFunction = (x: number, y: number, z: number) => number;

// --- Simplex Noise Instance (created once) ---
const noiseGenerator: Noise3DFunction = createNoise3D();

// --- Constants for Performance ---
const WAVE_SEGMENT_LENGTH = 12; // Slightly reduced for more detail
const NUM_WAVES_TO_DRAW = 6; // Increased back to 5 for more vibrant effect

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 60, // Increased for more prominent waves
  backgroundFill = "hsl(222, 47%, 11%)", // Default to a dark blue/black
  blur = 10,
  speed = "slow", // Default to slow for better performance
  waveOpacity = 0.7, // INCREASED from 0.2 to 0.7 for vibrant colors
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // State for canvas dimensions, updated on resize
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div

  // Enhanced color palette with more vibrant colors
  const waveColors = useMemo(
    () =>
      colors ?? [
        "#00d4ff", // Bright cyan
        "#7c3aed", // Vibrant purple
        "#f472b6", // Hot pink
        "#06ffa5", // Bright green
        "#fbbf24", // Golden yellow
      ],
    [colors],
  );

  const currentSpeed = useMemo(() => {
    switch (speed) {
      case "slow":
        return 0.0005; // Slightly faster for smoother animation
      case "fast":
        return 0.001;
      default:
        return 0.0005;
    }
  }, [speed]);

  // Resize handler using the container's dimensions
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  }, []);

  useEffect(() => {
    handleResize(); // Initial size

    // Debounced resize
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150); // Adjust debounce
    };
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [handleResize]);

  // Main drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) {
      return; // Don't draw if canvas not ready or no dimensions
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas drawing surface size based on state
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let nt = 0; // Noise time, reset for this effect run

    const drawWave = (waveIndex: number, currentNt: number) => {
      ctx.beginPath();
      ctx.lineWidth = waveWidth;
      ctx.strokeStyle = waveColors[waveIndex % waveColors.length];
      ctx.lineCap = "round"; // Smoother wave ends
      ctx.lineJoin = "round"; // Smoother wave joints
      const yOffset = dimensions.height * 0.5; // Center waves vertically

      for (let x = 0; x < dimensions.width; x += WAVE_SEGMENT_LENGTH) {
        const yNoise =
          noiseGenerator(x / 800, 0.3 * waveIndex, currentNt) * 120; // Increased amplitude
        ctx.lineTo(x, yNoise + yOffset);
      }
      ctx.stroke();
      ctx.closePath();
    };

    const render = () => {
      // Clear with background fill with slight transparency for trailing effect
      ctx.globalAlpha = 0.95; // Slight transparency for subtle trailing
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw waves with enhanced opacity and blending
      ctx.globalAlpha = waveOpacity;
      ctx.globalCompositeOperation = "screen"; // Blend mode for more vibrant colors

      nt += currentSpeed; // Increment noise time for animation
      for (let i = 0; i < NUM_WAVES_TO_DRAW; i++) {
        drawWave(i, nt);
      }

      // Reset composite operation for next frame
      ctx.globalCompositeOperation = "source-over";

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    // Clean up previous animation frame before starting a new one
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [
    dimensions,
    waveColors,
    waveWidth,
    backgroundFill,
    currentSpeed,
    waveOpacity,
  ]);

  // Safari check remains for CSS filter decision
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        containerClassName,
      )}
    >
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute inset-0 z-0"
        style={{
          filter: `blur(${blur}px) `, // Added saturation for more vibrant colors
        }}
      />
      {/* Children are layered on top */}
      <div className={cn("relative z-10 w-full h-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
