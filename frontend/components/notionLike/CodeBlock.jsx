"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CodeBlock = ({ block }) => {
  const { data } = block;
  
  return (
    <Card className="mb-6 bg-muted">
      <CardContent className="p-0">
        <div className="bg-muted-foreground/10 px-4 py-2 border-b">
          <Badge variant="secondary" className="text-xs">
            {data.language || 'Code'}
          </Badge>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">
            {data.code}
          </code>
        </pre>
      </CardContent>
    </Card>
  );
};