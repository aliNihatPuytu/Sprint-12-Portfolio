import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/slices/themeSlice'
import { toggleLanguage } from '../store/slices/languageSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const theme = useSelector(s => s.theme.mode)
  const lang = useSelector(s => s.language.current)

  const nav = lang === 'en'
    ? { home: 'Home', projects: 'Projects', contact: 'Contact', lang: "TÜRKÇE'YE GEÇ" }
    : { home: 'Anasayfa', projects: 'Projeler', contact: 'İletişim', lang: 'SWITCH TO ENGLISH' }

  const linkBase = 'text-sm font-medium opacity-90 hover:opacity-100'
  const linkActive = 'text-white dark:text-brand-lime'

  return (
    <header className="py-6">
      <div className="container-outer flex items-center justify-between">
        <div className="text-brand-lime font-display font-bold text-xl lowercase">ali nihat</div>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive ? linkActive : ''}`}>{nav.home}</NavLink>
          <NavLink to="/projects" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ''}`}>{nav.projects}</NavLink>
          <NavLink to="/contact" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ''}`}>{nav.contact}</NavLink>
        </nav>

        <div className="flex items-center gap-6">
          <button
            onClick={() => dispatch(toggleLanguage())}
            className="text-xs font-medium px-4 py-2 rounded-full border border-black/10 dark:border-white/20 hover:opacity-80"
            aria-label="Switch language"
          >
            {nav.lang}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide">
              {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme==='dark'}
                onChange={() => dispatch(toggleTheme())}
              />
              <div className="w-12 h-6 bg-gray-300 peer-checked:bg-brand-purple rounded-full
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                              after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all
                              peer-checked:after:translate-x-6"></div>
            </label>
          </div>
        </div>
      </div>
    </header>
  )
}
