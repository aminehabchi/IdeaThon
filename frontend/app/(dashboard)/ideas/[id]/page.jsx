import React from "react";
import { DashboardNavbar } from "@/components/dashboardNavbar";
import { ProjectNavbar } from "@/components/ideasComponent/ideaTopbar";
import {ProjectHeader} from "@/components/ideasComponent/ideabanner";
export default async function IdeaPage({ params }) {
  return (
    <>
     <DashboardNavbar />
     <ProjectNavbar></ProjectNavbar>
     <ProjectHeader></ProjectHeader>
     {/* <IdeaBody></IdeaBody> */}
    </>
  );
}

