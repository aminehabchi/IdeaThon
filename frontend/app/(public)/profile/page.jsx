
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
                    bio: `adjectif (aliment) Issu de l'agriculture biologique*. 
                    Légumes bios. adverbe Manger bio. Élaboré dans le respect de l'environnement 
                    et avec des composants végétaux issus de l'agriculture biologique.`,
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
