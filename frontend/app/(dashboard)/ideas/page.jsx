"use client";

import React, { useEffect, useState } from "react";
import { Categories } from "@/components/ideasComponent/categories";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import Ideathon from "@/components/ideasComponent/ideathonCard";
import Link from "next/link";
import { fetcher } from "@/lib/helpers";
import {getDaysLeft} from "@/lib/helpers";

const Page = () => {
  const [scroll, setScroll] = useState(0);
  const [ideathons, setIdeathons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    async function fetchIdeathon() {
      try {
        const data = await fetcher({
          url: "http://localhost:8080/api/ideathons/get",
          method: "POST",
          data: { offset: scroll, category: selectedCategory },
          token: null,
          returned_status: 200,
        });

        setIdeathons(data);
      } catch (err) {
        console.error("Error fetching ideathons:", err);
      }
    }

    fetchIdeathon();
  }, [scroll, selectedCategory]);

  return (
    <>
      <DashboardNavbar />
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        {ideathons?.map((idea) => (
          <Link key={idea.id} href={`/ideas/${idea.id}`}>
            <Ideathon {...idea} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
