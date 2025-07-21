
import { DashboardNavbar } from "@/components/dashboardNavbar";
import ProfileComponent from "@/components/profile";


export default function Profile() {
    return (
        <div>
            <DashboardNavbar />
            <ProfileComponent
                profile={{
                    name: "Bilal Daanouni",
                    location: "City / Country",
                    avatar: "/avatar.png",
                    totalPrize: 2000,
                    links: [
                        { label: "LinkedIn", url: "https://linkedin.com" },
                        { label: "Medium", url: "https://medium.com" }
                    ]
                }}
                createdIdeathons={[
                    { id: 1, title: "AI Hackathon", description: "An ideathon on building with AI" }
                ]}
                submittedEntries={[
                    { id: 1, title: "Smart Farming", description: "An idea for precision agriculture" }
                ]}
            />

        </div>
    );
}
