"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Unlock, Clock } from "lucide-react";
import { DocumentParser } from "@/lib/utils";

export const DocumentHeader = ({ data }) => {
  const daysLeft = DocumentParser.getDaysLeft(data.endDate);

  return (
    <nav className="border-b bg-gray-100 py-4 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/belmaayo_avatar.png" alt="Avatar" className="w-6 h-6 rounded-2xl" />
            <span className="font-medium text-gray-900">By {data.name}</span>
          </div>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-medium px-3 py-1 flex items-center">
            <Unlock className="w-3 h-3 mr-1" />
            {data.privacy}
          </Badge>
          {daysLeft !== null && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{daysLeft} Days Left</span>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">${data.price}</span>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto">
            Participate
          </Button>
        </div>
      </div>
    </nav>
  );
};