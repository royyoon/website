import techImg from "../assets/images/tech.png";
import gymImg from "../assets/images/gym.png";
import golfImg from "../assets/images/golf.png";
import cookingImg from "../assets/images/cooking.png";

export const profile = {
    name: "Roy Yoon",
    location: "Mission Viejo, CA",
    headline: "Father • Husband • Product + Engineering Leader",
    summary:
        "I build trustworthy, data-driven products and teams—then I go lift, cook, play golf, and hang with my family. I like clean systems, clear outcomes, and a little fun along the way.",
    work: {
        company: "People Science (Chloe)",
        title: "Director of Engineering Product Management",
        focus:
            "AI-augmented development, build processes, platform integrations (wearables), compliance-minded delivery.",
    },
    highlights: [
        "AI-augmented development + cost transition planning",
        "AWS-based architecture & integrations (HealthKit/Oura/Garmin)",
        "Security & compliance-aware product delivery",
        "Hands-on prototyping (React Native, Go, cloud services)",
    ],
    projects: [
        {
            title: "Gym scheduling & membership app",
            subtitle: "React Native + Go backend (AWS)",
            blurb:
                "A mobile app for workouts and instructional videos with an admin portal for scheduling, monitoring, and payments.",
            tags: ["React Native", "Go", "AWS", "RDS", "Cognito"],
            image: techImg
        },
        {
            title: "AI writing + research agent",
            subtitle: "LLM-assisted content workflows",
            blurb:
                "A system that turns research into useful, human-sounding posts—optimized for signal over hype.",
            tags: ["Python", "Agents", "Automation"],
        },
        {
            title: "Food economics & spice evolution book",
            subtitle: "Long-form writing project",
            blurb:
                "A personal + global lens on how food systems, trade, and culture shape what ends up on our plates.",
            tags: ["Writing", "Research"],
        },
    ],
    life: [
        {
            title: "Family",
            subtitle: "Husband + dad",
            blurb:
                "Most important role: present, playful, and reliable. The best days include laughter at home and small adventures.",
        },
        {
            title: "Training",
            subtitle: "High-intensity lifting",
            blurb:
                "I’m consistent, early, and goal-driven. Progress is built one session at a time.",
            image: gymImg
        },
        {
            title: "Golf",
            subtitle: "Chasing clean swings",
            blurb:
                "Golf keeps me humble. It’s half technique, half mindset, all patience.",
            image: golfImg
        },
        {
            title: "Cooking",
            subtitle: "Korean-inspired, grill-friendly",
            blurb:
                "I love bold flavors—gochujang, marinades, and anything that gets people to the table.",
            image: cookingImg
        },
    ],
    contact: {
        email: "roy.yoon@gmail.com",
        linkedin: "https://www.linkedin.com/in/roy-yoon-b2b2763/",
    },
};
