import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import { getProject } from './data/projects'
import { applyMeta, homeMeta, projectMeta } from './seo'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // only reset for project routes; the home route manages its own scroll/hash
    if (pathname.startsWith('/projeto/')) window.scrollTo(0, 0)
    const p = pathname.startsWith('/projeto/') ? getProject(pathname.split('/')[2]) : undefined
    applyMeta(p ? projectMeta(p) : homeMeta)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Background />
      <Cursor />
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:slug" element={<ProjectPage />} />
        <Route path="*" element={<ProjectPage />} />
      </Routes>
    </>
  )
}
