import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import { useSelector } from 'react-redux'
import { useDataQuery } from '../hooks/useDataQuery'

export default function ContactPage() {
  const lang = useSelector(s => s.language.current)
  const { data, isLoading, error } = useDataQuery(lang)

  if (isLoading) return <div className="container-outer py-20">Loading...</div>
  if (error) return <div className="container-outer py-20 text-red-600">Data error</div>

  return (
    <div className="bg-white text-gray-900 dark:bg-[#0F1020] dark:text-white min-h-screen">
      <div className="text-white bg-split-light dark:bg-split-dark">
        <Navbar />
      </div>
      <Contact t={data} />
    </div>
  )
}
