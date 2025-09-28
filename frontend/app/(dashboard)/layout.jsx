// import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
    title: "ValIdea",
    description: "",
};

export default function DashboardLayout({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
