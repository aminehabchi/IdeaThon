"use client";

import React, { useEffect, useState } from "react";
import { Categories } from "@/components/categories";
import { DashboardNavbar } from "@/components/dashboardNavbar";
import Ideathon from "@/components/ideathon";
import Link from "next/link";
import { fetcher } from "@/lib/helpers";

const page = () => {
  const [scroll, setScroll] = useState(0);
  const [ideathons, setIdeathons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searsh, setSearsh] = useState("");
  useEffect(() => {
    async function fetchIdeathon() {
      try {
        const data = await fetcher({
          url: " http://localhost:8080/api/ideathons/get",
          method: "POST",
          data: { offset: 0, category: selectedCategory, searsh: searsh },
          token: null,
          returned_status: 200,
        });
  
        setIdeathons(data);
      } catch (err) {
        console.error("Error fetching ideathons:", err);
      }
    }

    fetchIdeathon();
  }, [scroll]);

  const ideathon_data = {
    image: "https://example.com/cover.jpg",
    title: "Next-Gen Learning Platform",
    description:
      "A platform that redefines how students interact with educational content using AI and gamification.",
    author: "Aboubaker Elmaayouf",
    entries: 124,
    visibility: "Public",
    tag: "Education",
    price: "46",
    daysLeft: 7,
  };

  return (
    <>
      <DashboardNavbar />
      <Categories />
      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        <Link href={"/ideas/8"}>
          <Ideathon {...ideathon_data} />
        </Link>
        <Link href={"/ideas/8"}>
          <Ideathon {...ideathon_data} />
        </Link>
      </div>
    </>
  );
};

export default page;
