"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Puzzle() {
  const pieceRefs = useRef([]);

  // Initial scattered positions
  const positions = [
    { x: 12, y: 24 },    // Piece 1
    { x: -24, y: 12 },   // Piece 2
    { x: 24, y: -12 },   // Piece 3
    { x: -12, y: -24 },  // Piece 4
  ];

  useEffect(() => {
    // Set initial scattered positions instantly
    pieceRefs.current.forEach((el, i) => {
      gsap.set(el, {
        x: positions[i].x,
        y: positions[i].y,
      });
    });

    // Animate to center
    gsap.to(pieceRefs.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });

    // Animate back to original scattered positions
    gsap.to(pieceRefs.current, {
      x: (i) => positions[i].x,
      y: (i) => positions[i].y,
      duration: 1.2,
      delay: 3,
      ease: "power2.inOut",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="relative w-48 h-48 grid grid-cols-2 grid-rows-2 gap-0">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => (pieceRefs.current[i] = el)}
            className="w-24 h-24 overflow-hidden"
          >
            <img
              src={`/puzzle${i + 1}.svg`}
              alt={`Piece ${i + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
