import { useLang } from '../LangContext.jsx'
import HeroBackground from './HeroBackground.jsx'
import SplitText from './SplitText.jsx'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="top">
      <HeroBackground />

      <div className="hero-content container">
        <div className="hero-main">
          <a className="hero-badge" href="#works">
            <span className="hero-badge-dot" />
            {t.site.years} · {t.works.length} PAGES SELECTED WORKS
            <i>→</i>
          </a>

          {/* 主名号 + PORTFOLIO：每行套 .title-line 遮罩供 GSAP 做揭示进场，
              动画结束后由 GSAP 释放 overflow，手写体 slogan 才不被裁切 */}
          <h1 className="hero-title">
            <span className="title-line">
              <span className="hero-title-name">{t.site.alias}</span>
            </span>
            <span className="title-line">
              <span className="hero-title-word">
                <SplitText text="PORTFOLIO" />
                <em className="hero-script">Keep a bright heart</em>
              </span>
            </span>
          </h1>

          <p className="hero-desc">
            {t.ui.heroDesc1}
            <br />
            {t.ui.heroDesc2}
          </p>

          <div className="hero-actions">
            <a className="hero-btn hero-btn--primary" href="#works">
              {t.ui.viewWorks}
            </a>
            <a className="hero-btn" href="#contact">
              {t.ui.contact} <i>→</i>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span className="hero-meta">{t.ui.slogan}</span>
          <span className="hero-scroll">
            SCROLL
            <i />
          </span>
          <span className="hero-meta hero-meta--right">VISUAL GUIDANCE EXPERIENCE</span>
        </div>
      </div>
    </section>
  )
}
