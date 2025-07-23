"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const QuoteBlock = ({ block }) => {
  const { data } = block;
  
  return (
    <div className="mb-6 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <blockquote className="text-lg italic text-muted-foreground mb-3">
          "{data.text}"
        </blockquote>
        {data.caption && (
          <cite className="text-sm font-medium text-foreground">
            — {data.caption}
          </cite>
        )}
      </CardContent>
    </div>
  );
};