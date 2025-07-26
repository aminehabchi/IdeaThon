"use client";

import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import ProfileComponent from "@/components/ProfileComp/profile";
import { fetcher } from "@/lib/helpers";
import { IdeaLoader } from "@/components/ui/cosloader";
import { ProfileContent } from "@/components/ProfileComp/profileContent";
import { usePathname } from "next/navigation";
import ErrorCard from "@/components/ErrorComp/error";

export default function Profile() {
  const [ideathons, setIdeathons] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let id = pathname.split("/")[2];
    if (Number.isNaN(Number(id)) || Number(id) === 0) {
      id = -1;
    }

    async function fetchData() {
      setLoading(true);
      try {
        const [ideathonsRes, profileRes] = await Promise.all([
          fetcher({
            url: `http://localhost:8080/api/ideathons/get`,
            data: { user_id: Number(id) },
            method: "POST",
            returned_status: 200,
          }),
          fetcher({
            url: `http://localhost:8080/api/profile/get?profile_id=${id}`,
            method: "GET",
            returned_status: 200,
          }),
        ]);

        if (!profileRes) {
          setError(true);
        } else {
          setIdeathons(ideathonsRes);
          setProfileData(profileRes);
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <DashboardNavbar />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IdeaLoader />
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <ErrorCard status={404} text="Profile not found." />
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
