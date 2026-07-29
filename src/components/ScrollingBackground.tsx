"use client";
import React from "react";

const bgImages = Array.from({ length: 53 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/bg/ezgif-frame-${n}.jpg`;
});

// Duplicate for seamless loop
const allImages = [...bgImages, ...bgImages];

export default function ScrollingBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Overlay to darken background so content remains readable */}
      <div className="absolute inset-0 z-10 bg-[#050505]/85" />

      {/* Scrolling strip of images */}
      <div
        className="absolute top-0 left-0 w-full flex flex-col animate-bg-scroll"
        style={{ willChange: "transform" }}
      >
        {allImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt=""
            loading={idx < 10 ? "eager" : "lazy"}
            className="w-full object-cover flex-shrink-0"
            style={{ height: "100vh", objectPosition: "center" }}
          />
        ))}
      </div>
    </div>
  );
}
