import { Navbar } from "@/components/navbarcomps/navbar";
// import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext"; // adjust the path if needed

export const metadata = {
    title: "ValIdea",
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>

    );
}
