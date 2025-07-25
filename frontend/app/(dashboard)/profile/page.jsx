"use client";

import { use, useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import ProfileComponent from "@/components/ProfileComp/profile";
import { fetcher } from "@/lib/helpers";
import { IdeaLoader } from "@/components/ui/cosloader";
import { ProfileContent } from "@/components/ProfileComp/profileContent";


export default function Profile() {
    const [ideathons, setIdeathons] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            try {
                const [ideathonsRes, profileRes, user] = await Promise.all([
                    fetcher({
                        url: `http://localhost:8080/api/ideathons/get`,
                        data: { user_id: -1 },
                        method: "POST",
                        returned_status: 200,
                    }),
                    fetcher({
                        url: `http://localhost:8080/api/profile/get`,
                        method: "GET",
                        returned_status: 200,
                    }),
                ]);
                setIdeathons(ideathonsRes);
                setProfileData(profileRes);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-white">
            <DashboardNavbar />
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <IdeaLoader />
                    </div>
                ) : profileData ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left: Profile Info */}
                        <div className="w-full md:w-1/3">
                            <ProfileComponent profile={profileData} />
                        </div>

                        {/* Right: Tabbed Content */}
                        <div className="w-full md:w-2/3">
                            <ProfileContent ideathons={ideathons} />
                        </div>
                    </div>
                ) : (
                    <p className="text-center mt-10 text-gray-500">No profile found.</p>
                )}
            </div>
        </div>
    );
}
