"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import ProfileComponent from "@/components/ProfileComp/profile";
import { fetcher } from "@/lib/helpers";
import { IdeaLoader } from "@/components/ui/cosloader"; // Assuming this is a spinner/loader

export default function Profile() {

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfile() {
            let profileId = Number(window.location.href.split("/").pop());
            console.log("profile id --> ", profileId);

            if (Number.isNaN(profileId)) {
                profileId = 0;
            }

            try {
                setLoading(true);
                const data = await fetcher({
                    url: `http://localhost:8080/api/profile/get?profile_id=${profileId}`,
                    method: "GET",
                    returned_status: 200,
                });
                setProfileData(data);
            } catch (error) {
                console.error("Failed to load profile:", error.message);
            } finally {
                setLoading(false);
            }
        }

        getProfile();
    }, []);

    return (
        <div>
            <DashboardNavbar />
            <div className="min-h-screen bg-white px-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <IdeaLoader />
                    </div>
                ) : profileData ? (
                    <>
                        <ProfileComponent profile={profileData} />
                        <ProfileContent />
                    </>
                ) : (
                    <p className="text-center mt-10 text-gray-500">No profile found.</p>
                )}
            </div>
        </div>
    );
}

function ProfileContent() {
    const [activeTab, setActiveTab] = useState("ideathons");

    return (
        <section className="flex-1">
            <div className="flex gap-6 border-b mb-4 text-sm font-medium">
                <button
                    className={
                        activeTab === "ideathons"
                            ? "text-black border-b-2 border-black pb-1 cursor-pointer"
                            : "text-gray-500 hover:text-black cursor-pointer"
                    }
                    onClick={() => setActiveTab("ideathons")}
                >
                    Ideathons
                </button>
                <button
                    className={
                        activeTab === "entries"
                            ? "text-black border-b-2 border-black pb-1 cursor-pointer"
                            : "text-gray-500 hover:text-black cursor-pointer"
                    }
                    onClick={() => setActiveTab("entries")}
                >
                    Entries
                </button>
            </div>
            {/* Placeholder: add tab content here */}
        </section>
    );
}
