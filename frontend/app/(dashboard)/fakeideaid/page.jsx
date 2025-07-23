"use client";

import {MainParserIdea} from "@/components/notionLike/IdeaParser";
import { DashboardNavbar } from "@/components/dashboardNavbar";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname();
    let ideathon_id = Number(pathname.split("/")[2])
    console.log(ideathon_id);
    
    return (
        <>
            <DashboardNavbar />
            <MainParserIdea data={null} />
        </>
    );
}