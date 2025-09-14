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
            console.log("-->", ideathon_id);

            const backendPayload = {
                ideathon_id: Number(ideathon_id),
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

                toast.success("entry published successfully!");
                let redirect_path = pathname.replace("/create", "")
                router.push(redirect_path);
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
            <main className="mt-4 min-h-screen flex justify-center px-4">
                <div className="w-full max-w-7xl">
                    <h1 className="text-xl font-bold text-black mb-[-20px] ml-[20px]">
                        Create a New Entry
                    </h1>
                    <ProfessionalEditor setIsPublish={setIsPublish}
                        setEditorContent={setEditorContent} />
                </div>
            </main>
        </>)
}