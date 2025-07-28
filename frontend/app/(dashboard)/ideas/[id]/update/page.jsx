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
    const router = useRouter();
    const pathname = usePathname();

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
                    url: `http://localhost:8080/api/ideathons/update`,
                    method: "PUT",
                    data: backendPayload,
                    token: null,
                    returned_status: 204,
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

    useEffect(() => {
        const fetchIdeathonData = async () => {
            const ideathon_id = Number(pathname.split("/")[2]);

            // Validate ID
            if (!ideathon_id || isNaN(ideathon_id)) {
                return;
            }

            try {
                // Fetch data using the fetcher
                const response = await fetcher({
                    url: `http://localhost:8080/api/ideathons/get`,
                    method: "POST",
                    token: null, // Add token if authentication is required
                    data: { id: ideathon_id },
                    returned_status: 200,
                });

                // console.log("Fetched data:", response);
                let idea = response[0]
                setIdeathon(idea);

            } catch (err) {
                console.error("Error fetching ideathon data:", err);
                toast.error(`Failed to load ideathon: ${err.message}`);
            } finally {
            }
        };

        fetchIdeathonData();

    }, [])

    return (
        <>
            <DashboardNavbar />
            <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-4xl space-y-6 ">
                    <h1 className="text-xl font-bold text-black mb-[-10px]">
                        Update Ideathon
                    </h1>
                    <IdeathonForm setForm={setForm}  ideathon={ideathon}/>
                    <ProfessionalEditor
                        setIsPublish={setIsPublish}
                        setEditorContent={setEditorContent}
                        ideathon={ideathon}
                    />
                </div>
            </main>
        </>
    );
}

export default Update;
