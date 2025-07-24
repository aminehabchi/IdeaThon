"use client";

import React, { useEffect, useState } from "react";
import IdeathonForm from "@/components/ideasComponent/createIdea";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import Editor from "@/components/notionLike/notion_like";

function Create() {
  const [form, setForm] = useState({});
  return (
    <>
      <DashboardNavbar />
      <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-4xl space-y-6 ">
          <h1 className="text-xl font-bold text-black mb-[-10px]">
            Create a New Ideathon
          </h1>
          <IdeathonForm setForm={setForm} />
          <Editor form={form} />
        </div>
      </main>
    </>
  );
}

export default Create;
