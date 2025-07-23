"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IdeaBody } from "@/components/ideasComponent/ideaBody";
import { EntriesList } from "@/components/ideasComponent/ideaEntriesList";
import { fetcher } from "@/lib/helpers";

export function ProjectHeader({id}) {
  const [activeTab, setActiveTab] = useState("project");
  const [ideathon, setIdeathon] = useState({});
  useEffect(() => {
    if (!id) return;
    console.log("-->", id);
    console.log("--->", Number(id.id));
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
        console.log(data);
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
                  Imagine the future of
                  <br />
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
