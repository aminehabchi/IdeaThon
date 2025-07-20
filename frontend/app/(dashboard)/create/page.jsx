"use client"

import React from 'react'
import IdeathonForm from '@/components/createIdea'
import { DashboardNavbar } from '@/components/dashboardNavbar'
import Editor from '@/components/notion_like'

function Create() {
  return (
    <>
        <DashboardNavbar />
        <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-4xl space-y-6 ">
            <h1 className="text-xl font-bold text-black mb-[-10px]">Create a New Ideathon</h1>
            <IdeathonForm />
            <Editor></Editor>
            </div>
        </main>
    </>
  )
}

export default Create
