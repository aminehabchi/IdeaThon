import { SignUpForm } from "@/components/AuthComp/register-form"
import { Navbar } from "@/components/navbarcomps/navbar"
export default function RegisterPage() {
  return (
    <>
      
     <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
            <SignUpForm />
        </div>
     </div>
    </>

  )
}
