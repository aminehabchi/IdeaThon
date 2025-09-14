"use client";

import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import ProfileComponent from "@/components/ProfileComp/profile";
import { fetcher } from "@/lib/helpers";
import { IdeaLoader } from "@/components/ui/cosloader";
import { ProfileContent } from "@/components/ProfileComp/profileContent";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Profile() {
    const [ideathons, setIdeathons] = useState([]);
    const [entries, setEntries] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const [ideathonsRes, profileRes, entriesRes] = await Promise.all([
                    fetcher({
                        url: `/api/ideathons/get`,
                        data: { user_id: -1 },
                        method: "POST",
                        returned_status: 200,
                    }),
                    fetcher({
                        url: `/api/profile/get`,
                        method: "GET",
                        returned_status: 200,
                    }),
                    fetcher({
                        url: `/api/entries/get`,
                        data: { user_id: -1 },
                        method: "Post",
                        returned_status: 200,
                    })
                ]);
                setEntries(entriesRes);
                setIdeathons(ideathonsRes);
                setProfileData(profileRes);
                console.log("entries",entriesRes);
                
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <DashboardNavbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <IdeaLoader />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <DashboardNavbar />
                <div className="container mx-auto px-4 py-8">
                    <Alert variant="destructive" className="max-w-md mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Error loading profile: {error}
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-background">
                <DashboardNavbar />
                <div className="container mx-auto px-4 py-8">
                    <Card className="max-w-md mx-auto">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-semibold text-muted-foreground">
                                    No Profile Found
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Unable to load your profile data.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar />
            
            {/* Main Content Container */}
            <div className="container mx-auto px-4 py-6 lg:py-8">
                <h1 className="text-xl font-bold mb-4">Profile</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    
                    {/* Profile Sidebar - Full width on mobile, 4 columns on desktop */}
                    <div className="lg:col-span-4 xl:col-span-3 flex justify-center min-h-screen">
                    <div className="sticky top-6">
                        <ProfileComponent profile={profileData} />
                    </div>
                    </div>


                    {/* Content Area - Full width on mobile, 8 columns on desktop */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <div className="w-full">
                            <ProfileContent  ideathons={ideathons} entries={entries} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}