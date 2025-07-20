
import { DashboardNavbar } from "@/components/dashboardNavbar";
import ProfileComponent from "@/components/profile";


//fake data ...
const mockProfileData = {
    profile: {
        name: "Bilal Daanouni",
        location: "city/country",
        avatar: "/avatar.jpg",
        totalIdeathons: 8,
        totalPrize: 2000,
        links: [
            { label: "LINKEDIN", url: "https://linkedin.com/in/bilal" },
            { label: "MEDIUM", url: "https://medium.com/@bilal" }
        ]
    },
    ideas: [
        {
            number: 2,
            title: "Search for a better materials",
            description:
                "we are trying to build the next best thing and we want to have your feedback about ..."
        }
    ]
};

export default function Profile() {
    return (
        <div>
            <DashboardNavbar />
            <ProfileComponent
                profile={mockProfileData.profile}
                ideas={mockProfileData.ideas}
            />
        </div>
    );
}
