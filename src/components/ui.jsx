import React from "react";
import { ExternalLink } from "lucide-react";

export const Section = ({ id, title, icon: Icon, children, className = "" }) => (
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

export const Pill = ({ children }) => (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
        {children}
    </span>
);

export const Card = ({ title, subtitle, children, right, image, tags, href }) => {
    const CardContent = (
        <div className="group h-full rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col">
            {image && (
                <div className="h-48 w-full overflow-hidden relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
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
                {children ? <div className="mt-4 text-white/80 leading-relaxed text-sm flex-1">{children}</div> : <div className="flex-1" />}
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
