import React from 'react'
import { FaTwitter, FaGithub, FaDribbble, FaInstagram } from 'react-icons/fa6'

export default function Contact({ t }) {
  const icons = {
    twitter: FaTwitter,
    github: FaGithub,
    dribbble: FaDribbble,
    instagram: FaInstagram,
  }

  return (
    <section className="section">
      <div className="container-outer text-center">
        <h2 className="h1-48 text-brand-purple dark:text-white mb-6">{t.contact.title}</h2>
        <p className="max-w-xl mx-auto opacity-90">{t.contact.subtitle}</p>

        <a href={`mailto:${t.contact.email}`} className="inline-block mt-6 underline text-brand-purple">
          {t.contact.email}
        </a>

        <div className="mt-6 flex items-center justify-center gap-6 text-2xl text-brand-purple">
          {t.contact.socials.map((s, i) => {
            const key = s.label.toLowerCase()
            const Icon = icons[key] || null
            return (
              <a key={i} href={s.href} target="_blank" aria-label={s.label}
                 className="hover:opacity-80 transition-opacity">
                {Icon ? <Icon /> : s.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
