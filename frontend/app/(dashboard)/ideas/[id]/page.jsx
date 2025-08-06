"use client";

import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { usePathname } from "next/navigation";
import { DocumentViewer } from "@/components/notionLike/ParserUtils/DocumentViewer"; 
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/helpers";
import { IdeaLoader } from "@/components/ui/cosloader";
import {RotateCcw, ArrowLeft, FileX} from "lucide-react";

export default function Page() {
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Extract ideathon_id from pathname
  const ideathon_id = Number(pathname.split("/")[2]);
  // console.log("Ideathon ID:", ideathon_id);

  // Fetch data when component mounts or ID changes
  useEffect(() => {
      const fetchIdeathonData = async () => {
          // Validate ID
          if (!ideathon_id || isNaN(ideathon_id)) {
              setError("Invalid ideathon ID");
              setLoading(false);
              return;
          }

          try {
              setLoading(true);
              setError(null);
              
              // Fetch data using the fetcher
              const response = await fetcher({
                  url: `http://localhost:8080/api/ideathons/get`,
                  method: "POST",
                  token: null, // Add token if authentication is required
                  data:{id:ideathon_id},
                  returned_status: 200,
              });
              
              // console.log("Fetched data:", response);
              setData(response);
              
          } catch (err) {
              console.error("Error fetching ideathon data:", err);
              setError(err.message);
              toast.error(`Failed to load ideathon: ${err.message}`);
          } finally {
              setLoading(false);
          }
      };

      fetchIdeathonData();
  }, [ideathon_id]);

  // Loading or Error state - Show IdeaLoader
  if (loading || error) {
      return (
          <>
              <DashboardNavbar />
              <div className="mt-[-100px]">
                <IdeaLoader />
              </div>
          </>
      );
  }

  // No data state - Only shown when loading is complete and no data exists
  if (!data) {
    return (
        <>
            <DashboardNavbar />
            <div className="flex items-center justify-center min-h-screen bg-background mt-[-100px]">
                <div className="text-center space-y-6 max-w-md mx-auto px-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <FileX className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                            No Data Found
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            The requested ideathon could not be found. It may have been removed or you may not have permission to view it.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

  // Main content - only render when data exists
  return (
      <>
          <DashboardNavbar />
          <DocumentViewer data={data} id={ideathon_id} />
      </>
  );
}
