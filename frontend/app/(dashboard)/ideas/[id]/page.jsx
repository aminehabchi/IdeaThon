"use client"

// app/idea/[id]/page.tsx
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { ProjectNavbar } from "@/components/ideasComponent/ideaTopbar";
import { ProjectHeader } from "@/components/ideasComponent/ideabanner";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function IdeaPage() {
  const params = useParams();
  const id = params.id;

  return (
    <>
      <DashboardNavbar />
      <ProjectNavbar id={id} />
      <ProjectHeader id={id} />
      {/* <IdeaBody /> */}
    </>
  );
}
