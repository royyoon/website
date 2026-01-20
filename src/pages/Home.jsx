import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Briefcase,
    Coffee,
    Code2,
    Mail,
    MapPin,
    Sparkles,
    Users,
    FileText,
    ArrowRight
} from "lucide-react";

import articles from "../data/articles.json";
import { profile } from "../data/profile";
import { Section, Card, Pill } from "../components/ui";

export default function Home() {
    const [query, setQuery] = useState("");

    const filteredProjects = useMemo(() => {
        if (!query.trim()) return profile.projects;
        const q = query.toLowerCase();
        return profile.projects.filter((p) =>
            [p.title, p.subtitle, p.blurb, ...(p.tags || [])].join(" ").toLowerCase().includes(q)
        );
    }, [query]);

    // Insights Preview: Take top 3 latest
    // Assuming articles are sorted by Newest first in JSON? Or we sort them.
    // The JSON seems to have newest on top (based on ID/Date).
    const recentArticles = articles.slice(0, 2); // Show top 2 for grid balance or 3? User had 2 cols. 
    // User's grid was `md:grid-cols-2`. So 2 is good. Or 4.
    // Let's show up to 4.

    return (
        <div className="mx-auto max-w-6xl px-4 pt-20 md:pt-32 pb-24">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-12 gap-12 items-center mb-24 md:mb-32"
            >
                <div className="md:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200 font-medium mb-6"
                    >
                        <Sparkles className="h-3 w-3" />
                        {profile.headline}
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">Building products</span> <br />
                        that earn <span className="text-blue-400">trust</span>.
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mb-8">
                        {profile.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                        {profile.highlights.map((h) => (
                            <Pill key={h}>{h}</Pill>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#projects"
                            className="rounded-full bg-white text-black px-8 py-3.5 text-sm font-bold hover:bg-blue-50 transition shadow-xl shadow-white/5"
                        >
                            Explore projects
                        </a>
                        <a
                            href="#work"
                            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold hover:bg-white/10 transition backdrop-blur-sm"
                        >
                            View professional profile
                        </a>
                    </div>

                    <div className="mt-10 flex items-center gap-2 text-white/50 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-blue-400/70" />
                        {profile.location}
                    </div>
                </div>

                <div className="md:col-span-5 relative hidden md:block">
                    <div className="relative z-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl shadow-blue-900/20">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-blue-500/20 border border-blue-500/20 grid place-items-center text-blue-400">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-sm text-white/50 font-medium">Currently at</div>
                                <div className="text-xl font-bold">{profile.work.company}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">Focus</div>
                                <div className="text-white/80 text-sm leading-relaxed">{profile.work.focus}</div>
                            </div>
                        </div>
                    </div>

                    {/* Abstract decorative elements behind */}
                    <div className="absolute -top-10 -right-10 w-full h-full border border-white/5 rounded-3xl -z-10" />
                    <div className="absolute -bottom-5 -left-5 w-full h-full border border-white/5 rounded-3xl -z-10 bg-white/1" />
                </div>
            </motion.div>

            <div className="grid gap-20">
                {/* About Section */}
                <Section id="about" title="About" icon={Users}>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card
                            title="Who I am"
                            subtitle="A steady builder"
                        >
                            I care about outcomes, and I care about people. I’m happiest when a team ships something
                            useful, reliable, and simple enough to explain to a friend.
                        </Card>
                        <Card
                            title="What I value"
                            subtitle="Trust, craft, and momentum"
                        >
                            Strong foundations, honest communication, and systems that scale—without losing the human
                            part. I like pragmatic tech and calm leadership.
                        </Card>
                        <Card
                            title="Outside work"
                            subtitle="Family + hobbies"
                        >
                            You’ll find me lifting early, cooking something spicy, playing golf, or nerding out on cards
                            and collectibles with my kid.
                        </Card>
                    </div>
                </Section>

                {/* Insights Section */}
                {/* We only show recent articles here with a link to view all */}
                <Section id="insights" title="Insights" icon={FileText}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {recentArticles.map((article) => (
                            <Card
                                key={article.id}
                                title={article.title}
                                subtitle={article.date}
                                tags={article.tags}
                            >
                                <div className="whitespace-pre-line line-clamp-4">{article.content}</div>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link
                            to="/insights"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            View all insights <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Section>

                {/* Work Section */}
                <Section id="work" title="Professional" icon={Briefcase}>
                    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                        <Card
                            title={`${profile.work.title}`}
                            subtitle={profile.work.company}
                            right="Current"
                        >
                            I partner with leadership and engineers to turn business priorities into shipped product.
                            Lately that includes AI-augmented development workflows, build process improvements, and
                            cost-aware transition planning—while maintaining a strong bar for quality and compliance.
                        </Card>

                        <div className="flex flex-col gap-6">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm h-full">
                                <div className="font-semibold mb-4 flex items-center gap-2">
                                    <Code2 className="h-4 w-4 text-blue-400" /> Toolbox
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["AWS", "React Native", "Go", "Python", "CI/CD", "Security", "Integrations", "Data quality"].map(
                                        (t) => (
                                            <Pill key={t}>{t}</Pill>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Projects Section */}
                <Section id="projects" title="Projects" icon={Code2}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div className="text-white/60 text-lg">
                            A mix of professional-adjacent builds and passion projects.
                        </div>
                        <div className="w-full md:w-72">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Filter projects..."
                                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((p) => (
                            <Card
                                key={p.title}
                                title={p.title}
                                subtitle={p.subtitle}
                                tags={p.tags}
                                image={p.image}
                            >
                                {p.blurb}
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* Life Section */}
                <Section id="life" title="Life" icon={Coffee}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profile.life.map((x) => (
                            <Card
                                key={x.title}
                                title={x.title}
                                subtitle={x.subtitle}
                                image={x.image}
                            >
                                {x.blurb}
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* Contact Section */}
                <Section id="contact" title="Contact" icon={Mail}>
                    <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-white/10 p-8 md:p-12 text-center md:text-left relative overflow-hidden">
                        {/* Abstract shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-3xl font-bold mb-3">Ready to collaborate?</h3>
                                <p className="text-white/70 text-lg max-w-md">
                                    Whether it's about product engineering, lifting, or the perfect kimchi recipe—I'd love to chat.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-sm font-bold hover:bg-blue-50 transition shadow-xl shadow-black/20"
                                    href={`mailto:${profile.contact.email}`}
                                >
                                    <Mail className="h-4 w-4" />
                                    {profile.contact.email}
                                </a>
                                <a
                                    className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-8 py-4 text-sm font-bold hover:bg-white/20 transition backdrop-blur-sm"
                                    href={profile.contact.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Briefcase className="h-4 w-4" />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
}
