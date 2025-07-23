"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const UnsupportedBlock = ({ block }) => {
  return (
    <div className="mb-4 border-dashed border-muted-foreground/30">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          Unsupported block type: {block.type}
        </p>
      </CardContent>
    </div>
  );
};
