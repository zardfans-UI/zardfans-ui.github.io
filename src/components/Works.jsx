import { useCallback, useEffect, useState } from 'react'
import { works } from '../content.js'
import { useLang } from '../LangContext.jsx'
import './Works.css'

export default function Works() {
  const { t } = useLang()
  const chapters = t.workChapters
  const [active, setActive] = useState(null) // 当前 lightbox 索引（全局页码 - 1）
  const [currentChapter, setCurrentChapter] = useState(chapters[0].id)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(() => setActive((i) => (i > 0 ? i - 1 : works.length - 1)), [])
  const next = useCallback(() => setActive((i) => (i < works.length - 1 ? i + 1 : 0)), [])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, prev, next])

  // 滚动时高亮当前章节 chip
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrentChapter(e.target.dataset.chapter)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    document.querySelectorAll('.works-chapter').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="works" id="works">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="cn">
            <span className="index">03</span>
            {t.ui.sectionWorks}
          </h2>
          <span className="en">Selected Works · {works.length} Pages · 2023-2026</span>
        </div>
      </div>

      {/* 章节导航 chips */}
      <nav className="works-nav">
        <div className="works-nav-inner container">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#works-${c.id}`}
              className={`works-chip ${currentChapter === c.id ? 'works-chip--active' : ''}`}
            >
              <b>{c.num}</b>
              {c.title}
              <span className="works-chip-count">
                {String(c.end - c.start + 1).padStart(2, '0')}P
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="container">
        {chapters.map((c) => (
          <div className="works-chapter" id={`works-${c.id}`} data-chapter={c.id} key={c.id}>
            <header className="works-chapter-head reveal">
              <span className="works-chapter-num">{c.num}</span>
              <div>
                <h3>{c.title}</h3>
                <p>
                  {c.en} · P.{String(c.start).padStart(2, '0')} — P.{String(c.end).padStart(2, '0')}
                </p>
              </div>
            </header>

            <div className="works-grid">
              {works.slice(c.start - 1, c.end).map((w, idx) => {
                const globalIndex = c.start - 1 + idx
                // 通栏页：开篇章节全部、各章首页、以及压轴的设计方法论总结页
                const wide = c.id === 'overview' || idx === 0 || (c.id === 'ai' && globalIndex === c.end - 1)
                return (
                  <figure
                    className={`work-card reveal ${wide ? 'work-card--wide' : ''}`}
                    key={w.id}
                    onClick={() => setActive(globalIndex)}
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                    }}
                  >
                    <div className="work-frame">
                      <img src={w.src} alt={w.alt} loading="lazy" decoding="async" />
                      <span className="work-spotlight" aria-hidden="true" />
                      <figcaption>
                        <span className="work-page">P.{w.id}</span>
                        <span className="work-zoom">{t.ui.viewLarge}</span>
                      </figcaption>
                    </div>
                  </figure>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" aria-label={t.ui.lightbox.close} onClick={close}>
            ✕
          </button>
          <button
            className="lb-nav lb-prev"
            aria-label={t.ui.lightbox.prev}
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            ←
          </button>
          <img
            src={works[active].src}
            alt={works[active].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-nav lb-next"
            aria-label={t.ui.lightbox.next}
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            →
          </button>
          <span className="lb-counter">
            {works[active].id} / {String(works.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </section>
  )
}
