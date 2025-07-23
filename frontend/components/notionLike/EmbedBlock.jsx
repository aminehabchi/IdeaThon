"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const EmbedBlock = ({ block }) => {
  const { data } = block;
  
  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="aspect-video">
          <iframe
            src={data.embed}
            title="Embedded content"
            className="w-full h-full rounded-t-lg"
            allowFullScreen
          />
        </div>
        {data.caption && (
          <div className="p-3 bg-muted">
            <p className="text-sm text-muted-foreground text-center">
              {data.caption}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
