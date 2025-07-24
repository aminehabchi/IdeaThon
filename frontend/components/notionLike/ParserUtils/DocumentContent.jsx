"use client";
import React from "react";
import { BlockRenderer } from "./BlockRenderer";

export const DocumentContent = ({ data }) => {
  return (
    <div className="px-6 py-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          <h1 className="font-bold font-size" >{data?.subtitle}</h1>
          {data.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
};