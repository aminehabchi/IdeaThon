"use client";

import React, { useEffect, useState } from "react";
import { EntriesList } from "@/components/ideasComponent/ideaEntriesList"; // Keep the original EntriesList
import { fetcher } from "@/lib/helpers";
import { DocumentContent } from "./DocumentContent";
import { DocumentBanner } from "./DocumentBanner";

export function ProjectHeader({parsedData, id, ideathonData }) {
  const [activeTab, setActiveTab] = useState("project");
  const [entriesCount, setEntriesCount] = useState(0);

  // Optional: Fetch entries count for display in tab
  useEffect(() => {
    if (!id) return;
    async function fetchEntriesCount() {
      try {
        const data = await fetcher({
          url: " /api/entries/get",
          method: "POST",
          data: { offset: 0, ideathon_id: id },
          token: null,
          returned_status: 200,
        });
        
        if (data && Array.isArray(data)) {
          setEntriesCount(data.length);
        }
      } catch (err) {
        console.error("Error fetching entries count:", err);
      }
    }

    fetchEntriesCount();
  }, [id]);

  return (
    <div className="px-6 py-6 bg-white ">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex items-center gap-8 mb-8 border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setActiveTab("project")}
              className={`pb-4 px-1 font-medium transition-colors cursor-pointer ${activeTab === "project"
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
              className={`pb-4 px-1 font-medium transition-colors cursor-pointer ${activeTab === "entries"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Entries {entriesCount > 0 ? entriesCount : ''}
            </button>
          </div>
        </div>

        {activeTab === "project" && (
          <>
            {/* Idea body */}
            <DocumentBanner parsedData={parsedData} />
            <DocumentContent data={parsedData} />
          </>
        )}
        {activeTab === "entries" && <EntriesList id={id} ideathonData={ideathonData} />}
      </div>
    </div>
  );
}