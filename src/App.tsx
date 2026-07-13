import About from './components/About'
import Background from './components/Background'
import Contact from './components/Contact'
import Expertise from './components/Expertise'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Proof from './components/Proof'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Background />
      <Nav />
      <main id="main-content">
        <Hero />
        <Proof />
        <Projects />
        <Expertise />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
