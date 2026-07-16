import { useLang } from '../LangContext.jsx'
import './Strengths.css'

export default function Strengths() {
  const { t } = useLang()

  return (
    <section className="strengths" id="strengths">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="cn">
            <span className="index">02</span>
            {t.ui.sectionStrengths}
          </h2>
          <span className="en">Core Strengths</span>
        </div>

        <div className="strengths-grid">
          {t.strengths.map((s) => (
            <article
              className="strength-card reveal"
              key={s.num}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
            >
              <div className="strength-top">
                <span className="strength-num">{s.num}</span>
                <span className="strength-en">{s.en}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="strength-glow" aria-hidden="true" />
              <span className="strength-border" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
