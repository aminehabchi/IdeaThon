"use client"

import { usePathname } from 'next/navigation';

import React, { useState } from "react";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
// import EntryForm from "@/components/entriy_form/create_entry";
// import Editor from "@/components/entriy_form/entry_editor";
// import {ProfessionalEditor} from "@/components/notionLike/notion_like"; // ProfessionalEditor
import {ProfessionalEditor} from "@/components/notionLike/notion_like"

export default function Create_entry() {
    console.log("hello from create entry");

    const pathname = usePathname();
    let ideathon_id = Number(pathname.split("/")[2])
    console.log(ideathon_id);
    // const [form, setForm] = useState({});
    return (
        <>
            <DashboardNavbar />
            <main className="mt-4 min-h-screen flex justify-center px-4">
                <div className="w-full max-w-7xl">
                    <h1 className="text-xl font-bold text-black mb-[-20px] ml-[20px]">
                        Create a New Entry
                    </h1>
                    {/* <EntryForm setForm={setForm} /> */}
                    {/* <ProfessionalEditor form={null} /> */}
                    <ProfessionalEditor form={null} apiUrl={"api/entries/add"} />
                </div>
            </main>
        </>)
}