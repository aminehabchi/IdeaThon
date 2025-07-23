"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const TableBlock = ({ block }) => {
  const { data } = block;
  
  // Validate data structure
  if (!data || !data.content || !Array.isArray(data.content) || data.content.length === 0) {
    return (
      <div className="mb-6">
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            No table data available
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if we have at least one row
  if (data.content.length < 1) {
    return null;
  }

  // Determine if first row should be treated as header
  const hasHeader = data.withHeadings !== false; // Default to true unless explicitly false
  const headerRow = hasHeader ? data.content[0] : null;
  const bodyRows = hasHeader ? data.content.slice(1) : data.content;

  // Get maximum number of columns to handle inconsistent row lengths
  const maxColumns = Math.max(...data.content.map(row => row?.length || 0));

  return (
    <div className="mb-6">
      <div className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {hasHeader && headerRow && (
                <thead>
                  <tr className="bg-muted/50 border-b">
                    {Array.from({ length: maxColumns }, (_, index) => (
                      <th 
                        key={index} 
                        className="px-4 py-3 text-left font-semibold text-foreground border whitespace-nowrap"
                      >
                        <div className="min-w-0">
                          {headerRow[index] || ''}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="border last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    {Array.from({ length: maxColumns }, (_, cellIndex) => (
                      <td 
                        key={cellIndex} 
                        className="px-4 py-3 text-foreground border last:border-r-0 align-top"
                      >
                        <div 
                          className="min-w-0 break-words"
                          dangerouslySetInnerHTML={{ 
                            __html: row?.[cellIndex] || '' 
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table footer with row count */}
          {bodyRows.length > 0 && (
            <div className="px-4 py-2 bg-muted/20 border-t text-xs text-muted-foreground text-right">
              {bodyRows.length} row{bodyRows.length !== 1 ? 's' : ''} × {maxColumns} column{maxColumns !== 1 ? 's' : ''}
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};