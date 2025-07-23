"use client";
import React from "react";
import { BlockRenderer } from "./BlockRenderer";

export const DocumentContent = ({ blocks }) => {
  return (
    <div className="px-6 py-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
};