"use client";
import React from "react";

export const DelimiterBlock = ({ block }) => {
  return (
    <div className="my-8 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
      </div>
    </div>
  );
};