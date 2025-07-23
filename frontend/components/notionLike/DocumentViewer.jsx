"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentParser } from "@/lib/utils";
import { DocumentHeader } from "./DocumentHeader";
import { DocumentBanner } from "./DocumentBanner";
import { DocumentContent } from "./DocumentContent";

export const DocumentViewer = ({ data }) => {
  const parsedData = DocumentParser.parseDocument(data);

  if (!parsedData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">No content to display</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <DocumentHeader data={parsedData} />
      <DocumentBanner data={parsedData} />
      <DocumentContent blocks={parsedData.blocks} />
    </div>
  );
};
