import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Calendar } from "lucide-react";
import articles from "../data/articles.json";
import { Pill } from "../components/ui";

export default function ArticleDetail() {
    const { id } = useParams();
    const article = articles.find((a) => a.id === id);

    if (!article) {
        return <Navigate to="/insights" />;
    }

    return (
        <div className="mx-auto max-w-4xl px-4 pt-32 pb-24">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Link
                    to="/insights"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to insights
                </Link>

                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 grid place-items-center">
                            <FileText className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                            <Calendar className="h-4 w-4" />
                            {article.date}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {article.tags?.map((tag) => (
                            <Pill key={tag}>{tag}</Pill>
                        ))}
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-line text-white/80 text-lg leading-relaxed">
                            {article.content}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
