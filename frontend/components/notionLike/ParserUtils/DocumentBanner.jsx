"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";

export const DocumentBanner = ({ data }) => {

  console.log("DocumentBanner data:", data);
  return (
    <div className="px-6 py-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border-b-2 border-gray-200 pb-8">
          <div className="lg:max-w-2xl text-center lg:text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {data.categories.map((cat, idx) => (
                <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-600 font-normal px-4 py-2 text-sm rounded-full border-0">
                  #{cat}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img src={data.banner.url} alt="Banner" className="w-full max-w-xs rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
