import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    window.va?.('pageview')
  }, [location.pathname, location.search])

  return null
}

export default function App() {
  const theme = useSelector(s => s.theme.mode)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
