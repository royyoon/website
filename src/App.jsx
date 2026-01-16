import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Coffee,
  Code2,
  Dumbbell,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Users,
  ExternalLink
} from "lucide-react";

import profileImg from "./assets/images/profile.png";
import heroBg from "./assets/images/hero-bg.png";
import techImg from "./assets/images/tech.png";
import gymImg from "./assets/images/gym.png";
import golfImg from "./assets/images/golf.png";
import cookingImg from "./assets/images/cooking.png";

/**
 * Single-file personal website (React + Tailwind).
 * - Drop into: src/App.jsx (Vite/CRA) or app/page.tsx (Next) with minor tweaks.
 * - Tailwind assumed enabled.
 */

const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 grid place-items-center shadow-lg shadow-black/20">
        <Icon className="h-5 w-5 text-white/90" />
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
    {children}
  </span>
);

const Card = ({ title, subtitle, children, right, image, tags, href }) => {
  const CardContent = (
    <div className="group h-full rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300">
      {image && (
        <div className="h-48 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center gap-2">
              {title}
              {href && <ExternalLink className="h-3 w-3 opacity-50" />}
            </div>
            {subtitle ? <div className="text-sm text-white/70 mt-1">{subtitle}</div> : null}
          </div>
          {right ? <div className="text-sm text-white/70 bg-white/5 px-2 py-1 rounded-lg">{right}</div> : null}
        </div>
        {children ? <div className="mt-4 text-white/80 leading-relaxed text-sm">{children}</div> : null}
        {tags && tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {tags.map(t => <Pill key={t}>{t}</Pill>)}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">{CardContent}</a>;
  }
  return <div className="h-full">{CardContent}</div>;
};

const NavLink = ({ href, label }) => (
  <a
    href={href}
    className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
  >
    {label}
  </a>
);

export default function App() {
  const [query, setQuery] = useState("");

  const profile = useMemo(
    () => ({
      name: "Roy Yoon",
      location: "Mission Viejo, CA",
      headline: "Father • Husband • Product + Engineering Leader",
      // Keep this short; it’s the first thing recruiters/friends see.
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
          image: techImg // Using tech image for the app project
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
    }),
    []
  );

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return profile.projects;
    const q = query.toLowerCase();
    return profile.projects.filter((p) =>
      [p.title, p.subtitle, p.blurb, ...(p.tags || [])].join(" ").toLowerCase().includes(q)
    );
  }, [profile.projects, query]);

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
          <a href="#top" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-full border-2 border-white/10 overflow-hidden shadow-lg shadow-blue-500/20 group-hover:border-blue-400 transition-colors">
              <img src={profileImg} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold group-hover:text-blue-300 transition-colors">
                {profile.name}
              </div>
              <div className="text-xs text-white/50">{profile.work.title}</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#about" label="About" />
            <NavLink href="#work" label="Work" />
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#life" label="Life" />
            <NavLink href="#contact" label="Contact" />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#070A12] px-5 py-2 text-sm font-bold hover:bg-blue-50 transition shadow-lg shadow-white/10"
            >
              <Mail className="h-4 w-4" />
              Say hi
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* Hero */}
        <div className="mx-auto max-w-6xl px-4 pt-20 md:pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-12 gap-12 items-center"
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
              {/* Decorative card stack effect could go here, or just a nice visual */}
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
        </div>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-4 pb-24">
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

          <footer className="mt-24 border-t border-white/10 pt-12 text-sm text-white/40">
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
        </div>
      </main>
    </div>
  );
}
