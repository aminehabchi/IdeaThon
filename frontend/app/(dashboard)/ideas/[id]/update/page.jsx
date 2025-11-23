"use client";

import React, { useEffect, useState } from "react";
import IdeathonForm from "@/components/ideasComponent/createIdea";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { ProfessionalEditor } from "@/components/notionLike/notion_like";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { fetcher, imageToBase64 } from "@/lib/helpers";
import { usePathname } from "next/navigation";

function Update() {
    const [form, setForm] = useState({});
    const [ideathon, setIdeathon] = useState({});
    const [editorContent, setEditorContent] = useState("");
    const [isPublish, setIsPublish] = useState(false);
    const [ideathonId, setIdeathonId] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isPublish) return;

        const publishData = async () => {
            // Validate required fields
            if (!ideathonId) {
                toast.error("Ideathon ID is missing");
                setIsPublish(false);
                return;
            }

            if (!editorContent) {
                toast.error("Please add content before publishing");
                setIsPublish(false);
                return;
            }

            if (!form.endDate) {
                toast.error("Please select an end date");
                setIsPublish(false);
                return;
            }

            if (!form.categories || form.categories.length === 0) {
                toast.error("Please add at least one category");
                setIsPublish(false);
                return;
            }

            if (!form.privacy || form.privacy === 'Select Privacy') {
                toast.error("Please select a privacy option");
                setIsPublish(false);
                return;
            }

            let base64Banner = ideathon?.banner || "";

            // Only convert banner if a new one was uploaded
            if (form.banner && typeof form.banner !== 'string') {
                try {
                    base64Banner = await imageToBase64(form.banner);
                } catch (err) {
                    console.error("Banner conversion failed:", err);
                    toast.error("Failed to convert banner image to base64.");
                    setIsPublish(false);
                    return;
                }
            }

            // Extract title from editor content
            const title = editorContent?.document?.title || ideathon?.title || "Untitled";

            const backendPayload = {
                id: ideathonId,
                user_id: 1,
                title: title,
                description: JSON.stringify(editorContent),
                banner: base64Banner,
                price: parseInt(form.price, 10) || 0,
                created_at: ideathon?.created_at || new Date().toISOString(),
                start_date: form.startDate || ideathon?.start_date || "",
                end_date: form.endDate || "",
                category: Array.isArray(form.categories) ? form.categories : [],
                winner_id: ideathon?.winner_id || null,
                privacy: form.privacy || "public"
            };

            try {
                await fetcher({
                    url: `/api/ideathons/update`,
                    method: "PUT",
                    data: backendPayload,
                    token: null,
                    returned_status: 204,
                });

                toast.success("Ideathon updated successfully!");
                router.push(`/ideas/${ideathonId}`);
            } catch (error) {
                toast.error(`Failed to update ideathon: ${error.message || 'Unknown error'}`);
                console.error("Publishing error:", error);
            } finally {
                setIsPublish(false);
            }
        };


        publishData();
    }, [isPublish, ideathonId, editorContent, form, ideathon, router]);

    useEffect(() => {
        const fetchIdeathonData = async () => {
            const ideathon_id = Number(pathname.split("/")[2]);

            // Validate ID
            if (!ideathon_id || isNaN(ideathon_id)) {
                toast.error("Invalid ideathon ID");
                return;
            }

            setIdeathonId(ideathon_id);

            try {
                // Fetch data using the fetcher
                const response = await fetcher({
                    url: `/api/ideathons/get`,
                    method: "POST",
                    token: null, // Add token if authentication is required
                    data: { id: ideathon_id },
                    returned_status: 200,
                });

                // console.log("Fetched data:", response);
                let idea = response[0];

                if (!idea) {
                    toast.error("Ideathon not found");
                    return;
                }

                setIdeathon(idea);

            } catch (err) {
                console.error("Error fetching ideathon data:", err);
                toast.error(`Failed to load ideathon: ${err.message}`);
            }
        };

        fetchIdeathonData();

    }, [pathname])

    return (
        <>
            <Toaster position="top-center" richColors />
            <DashboardNavbar />
            <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-4xl space-y-6 ">
                    <h1 className="text-xl font-bold text-black mb-[-10px]">
                        Update Ideathon
                    </h1>
                    <IdeathonForm setForm={setForm} ideathon={ideathon} />
                    <ProfessionalEditor
                        setIsPublish={setIsPublish}
                        setEditorContent={setEditorContent}
                        initialTitle={ideathon?.description ? (() => { try { return JSON.parse(ideathon.description)?.document?.title || ""; } catch { return ""; } })() : ""}
                        initialSubtitle={ideathon?.description ? (() => { try { return JSON.parse(ideathon.description)?.document?.subtitle || ""; } catch { return ""; } })() : ""}
                        initialBlocks={ideathon?.description ? (() => { try { return JSON.parse(ideathon.description)?.blocks || []; } catch { return []; } })() : []}
                    />
                </div>
            </main>
        </>
    );
}

export default Update;
