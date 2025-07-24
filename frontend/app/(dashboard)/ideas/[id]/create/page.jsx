"use client"

import { usePathname } from 'next/navigation';

import React, { useState } from "react";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import EntryForm from "@/components/entriy_form/create_entry";
import Editor from "@/components/entriy_form/entry_editor";

export default function Create_entry() {
    console.log("hello from create entry");

    const pathname = usePathname();
    let ideathon_id = Number(pathname.split("/")[2])
    console.log(ideathon_id);
    const [form, setForm] = useState({});
    return (
        <>
            <DashboardNavbar />
            <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-4xl space-y-6 ">
                    <h1 className="text-xl font-bold text-black mb-[-10px]">
                        Create a New Entry
                    </h1>
                    <EntryForm setForm={setForm} />
                    <Editor form={form} />
                </div>
            </main>
        </>)
}