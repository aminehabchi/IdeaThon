"use client"

import React from 'react'
import IdeathonForm from '@/components/createIdea'
import { DashboardNavbar } from '@/components/dashboardNavbar'
import Editor from '@/components/notion_like'

function Create() {
  return (
    <>
        <DashboardNavbar />
        <main className="mt-[-60px] min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold text-black mb-6">Create a New Ideathon</h1>
            <IdeathonForm />
            <Editor></Editor>
            </div>
        </main>
    </>
  )
}

export default Create
