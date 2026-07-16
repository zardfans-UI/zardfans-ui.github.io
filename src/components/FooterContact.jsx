import { useEffect } from 'react'
import { useLang } from '../LangContext.jsx'
import './FooterContact.css'

export default function FooterContact() {
  const { t } = useLang()

  // 不蒜子访问量统计：脚本加载后自动填充 busuanzi_value_site_pv 并显示容器
  useEffect(() => {
    if (document.getElementById('busuanzi-script')) return
    const s = document.createElement('script')
    s.id = 'busuanzi-script'
    s.async = true
    s.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    document.body.appendChild(s)
  }, [])

  return (
    <section className="footer" id="contact">
      <div className="footer-inner container">
        <div className="footer-grid">
          {/* 左：大标题区 */}
          <div className="footer-left">
            <h2 className="footer-title reveal">
              LET&apos;S KEEP
              <br />A B<em>R</em>IGHT
              <br />
              HEART{' '}
              <svg className="footer-arrow" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 9 L31 31" />
                <path d="M31 13 V31 H13" />
              </svg>
            </h2>

            <span className="footer-logo-pill reveal">
              <i /> {t.site.alias}
            </span>
          </div>

          {/* 右：联系卡片 */}
          <aside className="footer-card reveal">
            <p className="footer-card-label">CONTACT</p>
            <ul>
              {t.site.contacts.map((c) => (
                <li key={c.label}>
                  <span className="fc-label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <span className="fc-value">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="footer-card-note">
              <span>UI/UX · Design System · AI Workflow</span>
              {/* 容器初始隐藏，不蒜子脚本取到数据后自动填充并显示 */}
              <span id="busuanzi_container_site_pv" className="footer-visits" style={{ display: 'none' }}>
                ◉ <b id="busuanzi_value_site_pv" /> VISITS
              </span>
            </p>
          </aside>
        </div>

        <footer className="footer-bar">
          <span>○ UI/UX DESIGN PROJECTS</span>
          <span className="footer-slogan">{t.ui.slogan}</span>
          <span>Copyright 2026 © {t.site.alias}</span>
        </footer>
      </div>
    </section>
  )
}
