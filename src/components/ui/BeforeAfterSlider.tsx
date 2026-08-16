"use client";
import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  heightClassName?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  heightClassName = "h-[300px] md:h-[400px]"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-[#E4DFE8] select-none ${heightClassName} cursor-ew-resize`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <Image
        src={afterImage}
        alt="After treatment"
        fill
        className="object-cover pointer-events-none"
      />
      <div className="absolute right-4 top-4 bg-[#5A2A5D] text-white text-[10px] font-semibold uppercase tracking-[0.1em] px-3 py-1 rounded-full z-10 opacity-90 backdrop-blur-sm">
        {afterLabel}
      </div>

      {/* Before Image (Overlayed on top) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before treatment"
          fill
          className="object-cover pointer-events-none"
        />
        <div className="absolute left-4 top-4 bg-white text-[#2E2E2E] border border-[#E4DFE8] text-[10px] font-semibold uppercase tracking-[0.1em] px-3 py-1 rounded-full z-10 opacity-90 backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 cursor-ew-resize shadow-md"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#E4DFE8] flex items-center justify-center shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95">
          <svg
            className="w-4 h-4 text-[#8E5C8F]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 9l-4 4 4 4m8-8l4 4-4 4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
