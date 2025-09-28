import React from 'react'
import PaymentPage from '@/components/PaymentComp/payment'
import { DashboardNavbar } from '@/components/navbarcomps/dashboardNavbar'

const page = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="max-w-2xl mx-auto mt-12 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
        <h1 className="text-2xl font-semibold text-green-700">Ideathon published successfully 🎉</h1>
        <p className="mt-2 text-green-600">Your ideathon is now live and visible to the community.</p>
      </section>
    </>
  )
}

export default page
