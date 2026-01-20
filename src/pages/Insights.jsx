import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Search, ArrowUpDown } from "lucide-react";
import articles from "../data/articles.json";
import { Card, Pill } from "../components/ui";

export default function Insights() {
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

    const filteredArticles = useMemo(() => {
        let result = articles;

        // Filter
        if (query.trim()) {
            const q = query.toLowerCase();
            result = result.filter((a) =>
                [a.title, a.content, ...(a.tags || [])].join(" ").toLowerCase().includes(q)
            );
        }

        // Sort
        // Assuming date format "January 20, 2026" works with Date.parse
        result = [...result].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [query, sortOrder]);

    return (
        <div className="mx-auto max-w-4xl px-4 pt-32 pb-24">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 grid place-items-center shadow-lg shadow-black/20">
                        <FileText className="h-5 w-5 text-white/90" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        Insights
                    </h1>
                </div>

                <p className="text-xl text-white/60 mb-12 max-w-2xl">
                    Thoughts on AI, markets, product strategy, and the technology shaping our future.
                </p>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                        />
                    </div>
                    <button
                        onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white/80"
                    >
                        <ArrowUpDown className="h-4 w-4" />
                        {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                    </button>
                </div>

                {/* List */}
                <div className="grid gap-6">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <Card
                                key={article.id}
                                title={article.title}
                                subtitle={article.date}
                                tags={article.tags}
                            >
                                <div className="whitespace-pre-line">{article.content}</div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 border border-white/5 rounded-3xl bg-white/5">
                            <p className="text-white/40">No articles found matching "{query}"</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
