import React from 'react'

export default function ProjectCard({ p }) {
  return (
    <article className="rounded-xl2 shadow-soft overflow-hidden bg-white dark:bg-brand-darkpanel">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="h-[220px] md:h-[360px]">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 md:p-8 flex flex-col min-h-[250px]">
          <div className="flex flex-col justify-center flex-1">
            <h3 className="font-display text-2xl text-brand-purple dark:text-white">{p.title}</h3>
            <p className="mt-3 text-sm opacity-90">{p.desc}</p>
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            {p.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-brand-purple text-white text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <a href={p.viewSite} target="_blank" className="text-sm underline">View Site</a>
            <a href={p.github} target="_blank" className="text-sm underline">Github</a>
          </div>
        </div>
      </div>
    </article>
  )
}
