"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export   const  RawBlock = ({ block }) => {
  const { data } = block;
  
  return (
    <div className="mb-6 border-l-4 border-l-orange-500">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <svg 
            className="w-4 h-4 text-orange-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
            />
          </svg>
          <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">
            Raw HTML
          </span>
        </div>
        
        {data.html && (
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        )}
        
        {!data.html && (
          <div className="text-sm text-muted-foreground italic">
            No HTML content provided
          </div>
        )}
      </CardContent>
    </div>
  );
};