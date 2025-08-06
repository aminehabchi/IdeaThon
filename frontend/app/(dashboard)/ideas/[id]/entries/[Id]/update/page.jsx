"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar"
import { ProfessionalEditor } from "@/components/notionLike/notion_like"
export default function UpdateEntry() {
    const pathname = usePathname()
    // console.log()
    return (
              <>
                  <DashboardNavbar />
                  <main className="mt-6 min-h-screen flex items-center justify-center bg-white px-4">
                      <div className="w-full max-w-4xl space-y-6 ">
                          <h1 className="text-xl font-bold text-black mb-[-10px]">
                              Update Ideathon entry Id: {pathname.split("/")[4]}
                          </h1>
                          {/* // we should get the ideathon id from the url */}
                          <ProfessionalEditor
                              setIsPublish={null}
                              setEditorContent={null}
                              ideathon={null}
                          />
                      </div>
                  </main>
              </>
    )
}