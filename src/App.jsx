import { useLayoutEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Strengths from './components/Strengths.jsx'
import Works from './components/Works.jsx'
import FooterContact from './components/FooterContact.jsx'
import BackToTop from './components/BackToTop.jsx'
import { LangProvider } from './LangContext.jsx'
import { initAnimations } from './animations.js'

export default function App() {
  // useLayoutEffect：在首帧绘制前设置好动画初始态，避免终态内容闪现
  useLayoutEffect(() => initAnimations(), [])

  return (
    <LangProvider>
      {/* 开场幕布 */}
      <div className="intro-overlay" aria-hidden="true">
        <span className="intro-mark">
          ZARDFANS<i>®</i>
        </span>
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Strengths />
        <Works />
        <FooterContact />
      </main>
      <BackToTop />
    </LangProvider>
  )
}
