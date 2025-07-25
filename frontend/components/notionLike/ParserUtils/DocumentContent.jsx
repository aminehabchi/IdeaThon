"use client";
import React from "react";
import { BlockRenderer } from "./BlockRenderer";

export const DocumentContent = ({ data }) => {
  // console.log("---> Document content:", data.blocks);

  if (!data || !data.blocks || !Array.isArray(data.blocks)) {
    return <p className="text-center text-muted-foreground">No content available</p>;
  }

  return (
    <div className="px-6 py-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {data.subtitle && (
            <h1 className="font-bold text-2xl">{data.subtitle}</h1>
          )}

          {data.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
};
