import React from "react";

export default function ProjectCard({ p }) {
  if (!p) return null;

  return (
    <article
      className="rounded-2xl overflow-hidden bg-white dark:bg-[#1E1E1E] shadow-[0_16px_40px_rgba(0,0,0,.25)]
                 w-full lg:w-[960px] h-auto lg:h-[374.43px]"
    >
      <div className="grid grid-cols-1 lg:[grid-template-columns:360px_1fr] gap-x-4 h-full">
        <div className="px-4 pt-4 lg:pl-4 lg:pr-0 lg:py-1">
          <div className="w-full lg:w-[360px] h-[240px] sm:h-[300px] lg:h-[360px] rounded-xl overflow-hidden">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="px-4 pb-4 lg:pr-4 lg:pl-0 lg:py-1 h-full flex">
          <div className="w-full lg:w-[584px] h-auto lg:h-[360px] flex flex-col justify-center px-0 lg:px-6">
            <h3 className="text-[24px] lg:text-[28px] font-semibold text-[#4731D3] dark:text-[#8F88FF]">
              {p.title}
            </h3>

            <p
              className="mt-3 text-sm opacity-90 leading-relaxed text-justify break-words overflow-hidden"
              style={{ display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical" }}
            >
              {p.desc}
            </p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {(p.tags || []).map((tag, i) => (
                <span key={i}
                      className="px-3 py-1 rounded-full text-xs text-white bg-[#4731D3] dark:bg-[#8F88FF]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              {p.viewSite && (
                <a href={p.viewSite} target="_blank" rel="noopener noreferrer"
                   className="text-sm underline hover:opacity-80 text-[#120B39] dark:text-[#CBF281]">
                  View Site
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                   className="text-sm underline hover:opacity-80 text-[#120B39] dark:text-[#CBF281]">
                  Github
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
