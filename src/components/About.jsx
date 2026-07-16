import { useLang } from '../LangContext.jsx'
import CountUp from './CountUp.jsx'
import './About.css'

export default function About() {
  const { t } = useLang()
  const { site, currentJob, pastJobs } = t

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="cn">
            <span className="index">01</span>
            {t.ui.sectionAbout}
          </h2>
          <span className="en">Experience & Profile</span>
        </div>

        <div className="about-grid">
          {/* 左：头像 + 简介 + 联系方式（ProfileCard 式 3D 倾斜 + 眩光） */}
          <aside
            className="about-profile reveal"
            onMouseMove={(e) => {
              const el = e.currentTarget
              const r = el.getBoundingClientRect()
              const px = (e.clientX - r.left) / r.width
              const py = (e.clientY - r.top) / r.height
              el.style.setProperty('--rx', `${(py - 0.5) * -4}deg`)
              el.style.setProperty('--ry', `${(px - 0.5) * 5}deg`)
              el.style.setProperty('--gx', `${px * 100}%`)
              el.style.setProperty('--gy', `${py * 100}%`)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--rx', '0deg')
              e.currentTarget.style.setProperty('--ry', '0deg')
            }}
          >
            <span className="about-profile-glare" aria-hidden="true" />
            <div className="about-avatar">
              <img src="/avatar.jpg" alt={site.name} loading="lazy" />
              <span className="about-avatar-ring" />
            </div>
            <h3 className="about-name">
              {site.name}
              <span>{site.alias}</span>
            </h3>
            <p className="about-role">
              {site.title} · {site.exp}
            </p>
            <p className="about-intro">{site.intro}</p>

            <ul className="about-contacts">
              {site.contacts.map((c) => (
                <li key={c.label}>
                  <span className="label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <span className="value">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* 右：最近经历重点卡片 + 时间线 */}
          <div className="about-right">
            <article className="about-current reveal">
              <header className="about-current-head">
                <div>
                  <p className="about-current-tag">{t.ui.nowTag}</p>
                  <h4>{currentJob.company}</h4>
                  <p className="about-current-role">
                    {currentJob.role} <i>/</i> {currentJob.location}
                  </p>
                </div>
                <span className="about-current-period">{currentJob.period}</span>
              </header>

              <p className="about-current-summary">{currentJob.summary}</p>

              <ul className="about-current-highlights">
                {currentJob.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="about-stats">
                {currentJob.stats.map((s) => (
                  <div className="about-stat" key={s.value}>
                    <strong className={s.good === 'up' ? 'up' : 'down'}>
                      <CountUp value={s.value} />
                    </strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <ol className="about-timeline">
              {pastJobs.map((j) => (
                <li key={j.period} className="reveal">
                  <div className="tl-head">
                    <h5>{j.company}</h5>
                    <span className="tl-period">{j.period}</span>
                  </div>
                  <p className="tl-role">{j.role}</p>
                  <p className="tl-desc">{j.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
