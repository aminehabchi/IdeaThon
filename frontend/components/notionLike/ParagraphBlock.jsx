"use client";
import React from "react";

export const ParagraphBlock = ({ block }) => {
  const { data } = block;
  
  return (
    <div
      className={`mb-4 text-base leading-relaxed text-foreground ${
        data.alignment === "center"
          ? "text-center"
          : data.alignment === "right"
          ? "text-right"
          : "text-left"
      }`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: "1.6"
      }}
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
};