import React from 'react'
import ProjectCard from './ProjectCard'

export default function Projects({ t }) {
  return (
    <section className="section bg-brand-lime/40 dark:bg-brand-darkolive/30">
      <div className="container-outer">
        <h2 className="h1-48 text-brand-purple dark:text-white mb-10">{t.projects.title}</h2>
        <div className="flex flex-col gap-8">
          {t.projects.items.map((p, idx) => <ProjectCard key={idx} p={p} />)}
        </div>
      </div>
    </section>
  )
}
