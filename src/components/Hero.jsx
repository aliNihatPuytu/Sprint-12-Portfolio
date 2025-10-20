import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export default function Hero({ t }) {
  return (
    <section className="section">
      <div className="container-outer grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="h1-48 !text-brand-lime dark:!text-brand-lime">
            {t.hero.titleLine1}<br/>{t.hero.titleLine2}
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-90">{t.hero.subtitle}</p>

          <div className="mt-6 flex gap-4">
            <a href={t.hero.githubUrl} target="_blank" className="btn-white" aria-label="Github">
              <FaGithub /> Github
            </a>
            <a href={t.hero.linkedinUrl} target="_blank" className="btn-white" aria-label="LinkedIn">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        <div className="justify-self-end">
          <div className="rounded-xl2 overflow-hidden shadow-soft">
            <img src={t.hero.image} alt="profile" className="w-[360px] h-[360px] object-cover"/>
          </div>
        </div>
      </div>
    </section>
  )
}
