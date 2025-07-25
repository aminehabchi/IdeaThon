"use client";

import React, { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { IdeaBody } from "@/components/ideasComponent/ideaBody";
import { EntriesList } from "@/components/ideasComponent/ideaEntriesList";
import { fetcher } from "@/lib/helpers";
import { DocumentContent } from "./DocumentContent";
import { DocumentBanner } from "./DocumentBanner";

export function ProjectHeader({parsedData, id }) {
  //console.log("id from projectheader",id);
  const [activeTab, setActiveTab] = useState("project");
  const [ideathon, setIdeathon] = useState({});

  useEffect(() => {
    if (!id) return;
    async function fetchIdeathon() {
      try {
        const data = await fetcher({
          url: " http://localhost:8080/api/ideathons/get",
          method: "POST",
          data: { id: Number(id.id), offset: 0 },
          token: null,
          returned_status: 200,
        });
        setIdeathon(data);
      } catch (err) {
        console.error("Error fetching ideathon:", err);
      }
    }

    fetchIdeathon();
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
              Entries 4
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
        {activeTab === "entries" && <EntriesList id={id} />}
      </div>
    </div>
  );
}
