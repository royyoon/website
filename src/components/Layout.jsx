import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Mail, Briefcase } from "lucide-react"; // Import Profile?? Wait, Profile is likely generic or image
// Checking App.jsx imports: Briefcase, Coffee, Code2, Dumbbell, Mail, MapPin, Sparkles, Trophy, Users, ExternalLink, FileText
// Profile image was local.
// I will just use common layout.

import profileImg from "../assets/images/profile.png";
import sayHiBtn from "../assets/images/say-hi-button.png";
import heroBg from "../assets/images/hero-bg.png"; // We need this for background

// Re-using profile data
import { profile } from "../data/profile";

const NavLink = ({ to, label, isHashLink }) => {
    // If it's a hash link, use simple <a> tag if on home, or Link to /#hash?
    // React Router HashLink is better but we don't have it.
    // If we are on Home, we can scroll. If on Insights, we must go to Home first.
    // Simplifying: Just use standard <a> tags for hash links if we assume Home is main.
    // BUT we are introducing true routing.
    // Let's make "Insights" a real Route Link.
    // "Projects", "Life", etc are sections on Home.
    // So Nav should differ or handle both.

    const location = useLocation();
    const isHome = location.pathname === "/";

    if (isHashLink) {
        if (isHome) {
            return (
                <a href={to} className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
                    {label}
                </a>
            );
        } else {
            return (
                <Link to={`/${to}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
                    {label}
                </Link>
            );
        }
    }

    return (
        <Link to={to} className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
            {label}
        </Link>
    );
};

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#020408] text-white selection:bg-blue-500/30">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <img
                    src={heroBg}
                    alt=""
                    className="w-full h-full object-cover opacity-50 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/80 via-[#020408]/90 to-[#020408] z-0" />
            </div>

            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px] animate-pulse" />
                <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]" />
                <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />
            </div>

            {/* Top Nav */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#020408]/70 border-b border-white/5">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 group">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-white/10 overflow-hidden shadow-lg shadow-blue-500/20 group-hover:border-blue-400 transition-colors">
                            <img src={profileImg} alt="Profile" className="h-full w-full object-cover" />
                        </div>
                        <div className="leading-tight">
                            <div className="text-sm md:text-lg font-bold group-hover:text-blue-300 transition-colors">
                                {profile.name}
                            </div>
                            <div className="text-xs md:text-sm text-white/50 hidden sm:block">{profile.work.title}</div>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink to="#about" label="About" isHashLink={true} />
                        <NavLink to="/insights" label="Insights" isHashLink={false} />
                        <NavLink to="#work" label="Work" isHashLink={true} />
                        <NavLink to="#projects" label="Projects" isHashLink={true} />
                        <NavLink to="#life" label="Life" isHashLink={true} />
                        <NavLink to="#contact" label="Contact" isHashLink={true} />
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href={`mailto:${profile.contact.email}`}
                            className="hover:scale-105 transition-transform"
                        >
                            <img src={sayHiBtn} alt="Say hi" className="h-14 md:h-20 w-auto rounded-full" />
                        </a>
                    </div>
                </div>
            </header>

            <main id="top" className="relative z-10">
                {children}

                <footer className="mx-auto max-w-6xl px-4 mt-24 border-t border-white/10 pt-12 pb-12 text-sm text-white/40">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>© {new Date().getFullYear()} {profile.name}.</div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-3 w-3 text-blue-400" />
                                Professional when it counts. Fun always.
                            </span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
