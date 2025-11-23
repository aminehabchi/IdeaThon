"use client"


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfessionalEditor } from "@/components/notionLike/notion_like";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { toast, Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { fetcher } from "@/lib/helpers";

export default function Create_entry() {


    const pathname = usePathname();
    const [editorContent, setEditorContent] = useState("");
    const [isPublish, setIsPublish] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!isPublish) return;

        const publishData = async () => {
            let ideathon_id = pathname.split("/")[2];

            // Validate ideathon ID
            const ideathonIdNumber = Number(ideathon_id);
            if (!ideathon_id || isNaN(ideathonIdNumber)) {
                toast.error("Invalid ideathon ID");
                setIsPublish(false);
                return;
            }

            // Validate content exists
            if (!editorContent) {
                toast.error("Please add content before publishing");
                setIsPublish(false);
                return;
            }

            // Validate content has title
            if (!editorContent?.document?.title || editorContent.document.title.trim() === "") {
                toast.error("Please add a title to your entry");
                setIsPublish(false);
                return;
            }

            // Validate content has blocks
            if (!editorContent?.blocks || editorContent.blocks.length === 0) {
                toast.error("Please add content to your entry");
                setIsPublish(false);
                return;
            }

            const backendPayload = {
                ideathon_id: ideathonIdNumber,
                description: JSON.stringify(editorContent),
            };

            try {
                await fetcher({
                    url: `/api/entries/add`,
                    method: "POST",
                    data: backendPayload,
                    token: null,
                    returned_status: 201,
                });

                toast.success("Entry published successfully!");
                let redirect_path = pathname.replace("/create", "");
                router.push(redirect_path);
            } catch (error) {
                const errorMessage = error?.message || "Failed to publish entry. Please try again.";
                toast.error(errorMessage);
                console.error("Publishing error:", error);
            } finally {
                setIsPublish(false);
            }
        };

        publishData();
    }, [isPublish, pathname, editorContent, router]);

    return (
        <>
            <Toaster position="top-center" richColors />
            <DashboardNavbar />
            <main className="mt-6 min-h-screen flex justify-center px-4 bg-white">
                <div className="w-full max-w-7xl py-4">
                    <h1 className="text-2xl font-bold text-black mb-6 px-4">
                        Create a New Entry
                    </h1>
                    <ProfessionalEditor
                        setIsPublish={setIsPublish}
                        setEditorContent={setEditorContent}
                    />
                </div>
            </main>
        </>)
}