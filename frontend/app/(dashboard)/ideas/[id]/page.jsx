// app/idea/[id]/page.tsx
import { DashboardNavbar } from "@/components/dashboardNavbar";
import { ProjectNavbar } from "@/components/ideasComponent/ideaTopbar";
import { ProjectHeader } from "@/components/ideasComponent/ideabanner";

export default function IdeaPage({ params }) {
  const id = params.id;
  console.log("+++++", id);

  return (
    <>
      <DashboardNavbar />
      <ProjectNavbar  id={id} />
      <ProjectHeader id={id} />
      {/* <IdeaBody /> */}
    </>
  );
}
