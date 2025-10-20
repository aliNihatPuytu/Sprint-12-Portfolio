import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Profile from '../components/Profile'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import { useSelector } from 'react-redux'
import { useDataQuery } from '../hooks/useDataQuery'

export default function Home() {
  const lang = useSelector(s => s.language.current)
  const { data, isLoading, error } = useDataQuery(lang)

  if (isLoading) return <div className="container-outer py-20">Loading...</div>
  if (error) return <div className="container-outer py-20 text-red-600">Data error</div>

  const t = data

  return (
    <div className="bg-white text-gray-900 dark:bg-[#0F1020] dark:text-white">
      <div className="text-white bg-split-light dark:bg-split-dark">
        <Navbar />
        <Hero t={t} />
      </div>

      <Skills t={t} />

      <div className="bg-brand-purple text-white dark:bg-brand-darkbg">
        <Profile t={t} />
      </div>

      <Projects t={t} />
      <Contact t={t} />
    </div>
  )
}
