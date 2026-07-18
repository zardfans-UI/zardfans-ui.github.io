import { useEffect, useState } from 'react'
import { useLang } from '../LangContext.jsx'
import './Navbar.css'

const sectionIds = ['about', 'strengths', 'works']

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滚动到对应模块时高亮导航项（hero/contact 区域不高亮任何项）。
  // 直接在 scroll 事件里按几何位置判定：只读 3 次 rect、无写操作，不会强制重排；
  // 不用 rAF 节流是因为后台/节能标签页里 rAF 会被浏览器压到秒级，导致高亮滞后。
  useEffect(() => {
    const spy = () => {
      const line = window.innerHeight * 0.38
      let current = null
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom >= line) current = id
      })
      setActive(current)
    }
    spy()
    window.addEventListener('scroll', spy, { passive: true })
    return () => window.removeEventListener('scroll', spy)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner container">
        <a className="nav-logo" href="#top" onClick={() => setOpen(false)}>
          <span className="nav-logo-dot" />
          {t.site.alias}
          <span className="nav-logo-sub">{t.site.years}</span>
        </a>

        <nav className={`nav-links ${open ? 'nav-links--open' : ''}`}>
          {t.ui.navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'nav-link--active' : ''}
              onClick={() => {
                setActive(l.id)
                setOpen(false)
              }}
            >
              {l.label}
            </a>
          ))}
          <a className="nav-cta nav-cta--mobile" href="#contact" onClick={() => setOpen(false)}>
            {t.ui.contact} →
          </a>
        </nav>

        {/* 简/繁/EN 三语切换 */}
        <div className="nav-lang" role="group" aria-label="切换语言 / Switch language">
          {[
            ['zh', '简'],
            ['zhHant', '繁'],
            ['en', 'EN'],
          ].map(([code, label], i) => (
            <span key={code} className="nav-lang-seg">
              {i > 0 && <i>/</i>}
              <button
                className={lang === code ? 'nav-lang--on' : ''}
                onClick={() => setLang(code)}
              >
                {label}
              </button>
            </span>
          ))}
        </div>

        <a className="nav-cta nav-cta--desktop" href="#contact">
          {t.ui.contact} →
        </a>

        <button
          className={`nav-burger ${open ? 'nav-burger--open' : ''}`}
          aria-label="菜单"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
