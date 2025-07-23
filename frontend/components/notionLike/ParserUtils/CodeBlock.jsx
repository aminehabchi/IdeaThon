"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeBlock = ({ block }) => {
  const { data } = block;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };
  
  return (
    <div className="mb-6">
      <div className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
            <Badge variant="secondary" className="text-xs font-medium">
              {data.language || 'Code'}
            </Badge>
            <button
              onClick={copyToClipboard}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted-foreground/10"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={data.language || 'javascript'}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'hsl(var(--muted))',
              fontSize: '0.875rem',
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              color: 'hsl(var(--muted-foreground))',
              paddingRight: '1rem',
              fontSize: '0.75rem',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
              }
            }}
          >
            {data.code}
          </SyntaxHighlighter>
        </CardContent>
      </div>
    </div>
  );
};