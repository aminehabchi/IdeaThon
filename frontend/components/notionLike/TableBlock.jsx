"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const TableBlock = ({ block }) => {
  const { data } = block;
  
  if (!data.content || !Array.isArray(data.content)) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {data.content[0]?.map((header, index) => (
                  <th key={index} className="px-4 py-3 text-left font-medium text-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.content.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b last:border-b-0">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
