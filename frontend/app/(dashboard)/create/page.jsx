"use client";

import React, { useEffect, useState } from "react";
import IdeathonForm from "@/components/ideasComponent/createIdea";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { ProfessionalEditor } from "@/components/notionLike/notion_like";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { fetcher, imageToBase64 } from "@/lib/helpers";

function Create() {
  const [form, setForm] = useState({});
  const [editorContent, setEditorContent] = useState("");
  const [isPublish, setIsPublish] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPublish) return;

    const publishData = async () => {
      let base64Banner = "";

      if (form.banner) {
        try {
          base64Banner = await imageToBase64(form.banner);
        } catch (err) {
          console.error("Banner conversion failed:", err);
          toast.error("Failed to convert banner image to base64.");
          setIsPublish(false);
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
        privacy: form.privacy || "public"
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
        router.push("/create/publish");
      } catch (error) {
        toast.error("Failed to publish ideathon.");
        console.error("Publishing error:", error);
      } finally {
        setIsPublish(false);
      }
    };

    publishData();
  }, [isPublish]);

  return (
    <>
      <DashboardNavbar />
      <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-4xl space-y-6 ">
          <h1 className="text-xl font-bold text-black mb-[-10px]">
            Create a New Ideathon
          </h1>
          <IdeathonForm setForm={setForm} />
          <ProfessionalEditor
            setIsPublish={setIsPublish}
            setEditorContent={setEditorContent}
          />
        </div>
      </main>
    </>
  );
}

export default Create;
