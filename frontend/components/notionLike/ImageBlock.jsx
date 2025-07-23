"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ImageBlock = ({ block }) => {
  const { data } = block;
  
  return (
    <div className="mb-6">
      <Card className="inline-block overflow-hidden">
        <img
          src={data.file?.url || data.url}
          alt={data.alt || data.caption || "Image"}
          className="max-w-full h-auto"
        />
        {data.caption && (
          <CardContent className="p-3 bg-muted">
            <p className="text-sm text-muted-foreground text-center">
              {data.caption}
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};