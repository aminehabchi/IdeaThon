import React from 'react'
import PaymentPage from '@/components/PaymentComp/payment'
import { DashboardNavbar } from '@/components/navbarcomps/dashboardNavbar'
const page = () => {
  return (
    <>
        <DashboardNavbar/>
        <PaymentPage />
    </>
  )
}

export default page
