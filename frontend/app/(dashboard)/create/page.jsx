"use client";

import React, { useState, useEffect } from "react";
import IdeathonForm from "@/components/ideasComponent/createIdea";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { ProfessionalEditor } from "@/components/notionLike/notion_like";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { fetcher, imageToBase64 } from "@/lib/helpers";

function Create() {
  const [form, setForm] = useState({});
  const [isThereError, setIsThereError] = useState(true);
  const [editorContent, setEditorContent] = useState(null);
  const router = useRouter();

  // When editorContent changes, submit to backend
  useEffect(() => {
    if (!editorContent) return;

    const publishData = async () => {
      if (
        !editorContent.blocks?.length ||
        editorContent.document.title.toLowerCase() === "untitled" ||
        isThereError
      ) {
        toast.error("Please fill all required fields.");
        return;
      }

      let base64Banner = "";
      if (form.banner) {
        try {
          base64Banner = await imageToBase64(form.banner);
        } catch (err) {
          toast.error("Failed to convert banner image.");
          return;
        }
      }

      const backendPayload = {
        user_id: 1,
        description: JSON.stringify(editorContent),
        banner: base64Banner,
        price: parseInt(form.price, 10) || 0,
        created_at: new Date().toISOString(),
        start_date: form.startDate || "",
        end_date: form.endDate || "",
        category: Array.isArray(form.categories) ? form.categories : [],
        winner_id: null,
        privacy: form.privacy || "public",
      };

      try {
        await fetcher({
          url: `/api/ideathons/add`,
          method: "POST",
          data: backendPayload,
          token: null,
          returned_status: 201,
        });

        toast.success("Ideathon published successfully!");
        router.push("/ideas");
      } catch (error) {
        toast.error("Failed to publish ideathon. Please try again.");
      }
    };

    publishData();
  }, [editorContent, form, isThereError, router]);

  return (
    <>
      <DashboardNavbar />
      <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-xl font-bold text-black mb-[-10px]">
            Create a New Ideathon
          </h1>
          <IdeathonForm setForm={setForm} setisThereError={setIsThereError} />
          <ProfessionalEditor setEditorContent={setEditorContent} />
        </div>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}

export default Create;
