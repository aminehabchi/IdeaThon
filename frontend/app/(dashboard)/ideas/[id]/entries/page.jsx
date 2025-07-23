"use client";

import React, { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/dashboardNavbar";
import Link from "next/link";
import { fetcher } from "@/lib/helpers";
import Entry from "@/components/entry";
import { usePathname } from 'next/navigation';

import { ProjectNavbar } from "@/components/ideasComponent/ideaTopbar";

const page = () => {
    const [scroll, setScroll] = useState(0);
    const [entries, setEntries] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searsh, setSearsh] = useState("");
    useEffect(() => {
        async function fetchIdeathon() {
            // try {
            //     const data = await fetcher({
            //         url: " http://localhost:8080/api/entries/get",
            //         method: "POST",
            //         data: { offset: 0, category: selectedCategory, searsh: searsh },
            //         token: null,
            //         returned_status: 200,
            //     });
            //     console.log(data);
            //     setIdeathons(data);
            // } catch (err) {
            //     console.error("Error fetching ideathons:", err);
            // }
        }

        fetchIdeathon();
    }, [scroll]);

    const entry_data = {
        id: 1,
        image: "https://example.com/cover.jpg",
        title: "Next-Gen Learning Platform",
        description:
            "A platform that redefines how students interact with educational content using AI and gamification.",
        author: "Aboubaker Elmaayouf",
        daysLeft: 7,
    };
    const pathname = usePathname();
    console.log(pathname);
    let ideathon_id = pathname.split("/")[2]
    console.log(ideathon_id);

    return (
        <>
            <DashboardNavbar />
            <ProjectNavbar ideathon_id={Number(ideathon_id)} />
            <div className="flex flex-col items-center justify-center gap-8 mt-8">
                <Link href={`${pathname}/${entry_data.id}`}>
                    <Entry {...entry_data} />
                </Link>
                <Link href={`${pathname}/${entry_data.id}`}>
                    <Entry {...entry_data} />
                </Link>
            </div>
        </>
    );
};

export default page;
