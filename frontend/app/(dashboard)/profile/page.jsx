"use client";

import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/dashboardNavbar";
import ProfileComponent from "@/components/profile";
import { fetcher } from "@/lib/helpers"
import { IdeaLoader } from "@/components/ui/cosloader";
export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfile() {
            try {
                const data = await fetcher({
                    url: "http://localhost:8080/api/profile",
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

    if (loading || !profileData) return <IdeaLoader />;
    console.log(profileData);

    return (
        <div>
            <DashboardNavbar />
            <ProfileComponent
                profile={profileData}
                createdIdeathons={profileData.created_ideathons}
                submittedEntries={profileData.submitted_entries}
            />



        </div>
    );
}
