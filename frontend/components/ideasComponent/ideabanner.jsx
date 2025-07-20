"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IdeaBody } from "@/components/ideasComponent/ideaBody";

export function ProjectHeader() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="px-6 py-6 bg-white ">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex items-center gap-8 mb-8 border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setActiveTab("project")}
              className={`pb-4 px-1 font-medium transition-colors cursor-pointer ${
                activeTab === "project"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Project
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setActiveTab("entries")}
              className={`pb-4 px-1 font-medium transition-colors cursor-pointer ${
                activeTab === "entries"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Entries 4
            </button>
          </div>
        </div>

        {activeTab === "project" && (
                <>
                {/* Main Content Flex Layout */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border-b-2 border-gray-200 pb-8">
                <div className="lg:max-w-2xl text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    Imagine the future of<br />
                    General robotics
                    </h1>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 font-normal px-4 py-2 text-sm rounded-full border-0"
                    >
                        # Tech
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 font-normal px-4 py-2 text-sm rounded-full border-0"
                    >
                        # Robotics
                    </Badge>
                    </div>
                </div>

                <div className="flex justify-center">
                    <img
                    src="/belmaayo_avatar.png"
                    alt="Robot"
                    className="w-full max-w-xs rounded-lg shadow-lg"
                    />
                </div>
                </div>

                {/* Idea body */}
                <IdeaBody />
                </>
        )}

        {activeTab === "entries" && <EntriesList />}
      </div>
    </div>
  );
}


export function EntriesList() {
    const entries = [1, 2, 3, 4]; // Placeholder data
  
    return (
      <div className="mt-8 pt-8 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Entry #{entry}
              </h3>
              <p className="text-sm text-gray-600">
                This is a short description of entry {entry}. It provides
                insight into what this entry covers.
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }