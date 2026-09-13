import { useCallback, useEffect, useState } from 'react'
import { useLang } from '../LangContext.jsx'
import './UsLuck.css'

const screens = [
  ['screen-login.png', 'LOGIN · 登录方式'],
  ['screen-red-lobby.png', 'LOBBY · 红色大厅'],
  ['screen-green-lobby.png', 'LOBBY · 绿色大厅'],
  ['screen-store.png', 'STORE · 充值商城'],
  ['screen-redeem-locked.png', 'REDEEM · 兑换窗口｜未解锁'],
  ['screen-redeem-unlocked.png', 'REDEEM · 兑换窗口｜解锁后'],
  ['screen-activity.png', 'ACTIVITY · 活动中心'],
  ['screen-profile.png', 'PROFILE · 我的'],
]

export default function UsLuck() {
  const { lang } = useLang()
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(() => setActive((i) => (i > 0 ? i - 1 : screens.length - 1)), [])
  const next = useCallback(() => setActive((i) => (i < screens.length - 1 ? i + 1 : 0)), [])
  useEffect(() => {
    if (active === null) return undefined
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
  const en = lang === 'en'
  const copy = en
    ? {
        kicker: 'NEW CASE STUDY · 2026',
        title: 'US LUCK',
        lead: 'A dual-currency social casino experience designed for clarity, momentum and trust.',
        intro: 'The brief',
        introText: 'US LUCK brings a familiar slot lobby together with a two-balance economy: GC for play and SC for redeemable rewards. The redesign keeps the energy of the category while making every balance, state and next action easy to understand.',
        system: 'One lobby, two economies',
        systemText: 'The core challenge was to make GC and SC feel related without making them interchangeable. Distinct color cues, repeated balance placement and explicit state feedback keep the user oriented from lobby to store to redeem.',
        before: 'From red-only to a flexible visual system',
        beforeText: 'The previous direction had strong casino energy, but the single red theme made currency states and product hierarchy compete for attention. The new system keeps the red signature and adds a green SC theme, clearer surfaces and stronger spacing rules for a scalable app.',
        research: 'Research → design decisions',
        researchText: 'Competitor review across DraftKings Casino, FanDuel Casino, BetMGM, Caesars Palace, Slotomania and Jackpot Party surfaced three recurring expectations: content first, rewards always visible, and transaction states explained before the user commits.',
        screens: 'Selected screens',
        systemMap: 'Full product map',
        open: 'OPEN FULL CASE →',
      }
    : {
        kicker: 'NEW CASE STUDY · 2026',
        title: 'US LUCK',
        lead: '面向美国市场的社交娱乐场体验设计：让双货币体系更清晰，让每一次操作更有把握。',
        intro: '项目概览',
        introText: 'US LUCK 将熟悉的 Slot 游戏大厅与 GC / SC 双货币体系结合：GC 用于游戏，SC 用于兑换奖励。本次新版升级保留品类需要的热闹氛围，同时把余额、状态和下一步操作放到更容易理解的位置。',
        system: '一个大厅，两种经济体系',
        systemText: '核心难题是让 GC 与 SC 保持关联，却不能让用户误以为两者可以互换。通过明确的颜色线索、固定余额位置和完整状态反馈，用户可以从大厅、商城一路顺畅走到兑换。',
        before: '从单一红版到可扩展视觉系统',
        beforeText: '旧版有很强的赌场氛围，但单一红色主题让货币状态和产品层级争抢注意力。新版保留红色识别度，同时增加绿色 SC 主题，并用更清晰的层级、卡面和间距规则支撑后续扩展。',
        research: '竞品研究 → 设计决策',
        researchText: '对 DraftKings Casino、FanDuel Casino、BetMGM、Caesars Palace、Slotomania 和 Jackpot Party 的研究归纳出三条共性：内容优先展示、奖励入口持续可见、交易状态在提交前就要解释清楚。',
        screens: '核心页面',
        systemMap: '完整页面系统',
        open: '查看完整案例 →',
      }

  return (
    <article className="usluck-case" id="works-usluck">
      <div className="usluck-hero">
        <div className="usluck-hero-copy">
          <span className="usluck-kicker">{copy.kicker}</span>
          <h3>{copy.title}</h3>
          <p>{copy.lead}</p>
          <div className="usluck-meta"><span>PRODUCT DESIGN</span><span>APP · IOS</span><span>GC / SC</span></div>
        </div>
        <div className="usluck-hero-art" aria-label="US LUCK red and green themes">
          <img src="/usluck/screen-red-lobby.png" alt="US LUCK red theme lobby" />
          <img src="/usluck/screen-green-lobby.png" alt="US LUCK green SC theme lobby" />
        </div>
      </div>

      <div className="usluck-body">
        <div className="usluck-intro">
          <div><span className="usluck-index">01</span><h4>{copy.intro}</h4></div>
          <p>{copy.introText}</p>
        </div>

        <div className="usluck-feature">
          <div className="usluck-feature-copy"><span className="usluck-index">02</span><h4>{copy.system}</h4><p>{copy.systemText}</p></div>
          <div className="usluck-token-grid"><div className="usluck-token usluck-token--gc"><b>GC</b><span>PLAY CREDITS</span><strong>423,399</strong></div><div className="usluck-token usluck-token--sc"><b>SC</b><span>REDEEMABLE</span><strong>423,399</strong></div></div>
        </div>

        <div className="usluck-screens">
          <div className="usluck-block-head"><div><span className="usluck-index">04</span><h4>{copy.screens}</h4></div><span>08 SCREENS</span></div>
          <div className="usluck-screen-grid">{screens.map(([src, label], i) => <figure className="usluck-screen" key={src} onClick={() => setActive(i)}><img src={`/usluck/${src}`} alt={label} loading="lazy" /><figcaption><span>{label}</span><b>VIEW LARGE +</b></figcaption></figure>)}</div>
          <div className="usluck-system-map"><div><span className="usluck-index">04—A</span><h5>{copy.systemMap}</h5></div><img src="/usluck/gc-overview-1.jpg" alt="US LUCK complete GC product page map" loading="lazy" /></div>
        </div>

        <div className="usluck-compare">
          <div className="usluck-compare-copy"><span className="usluck-index">03</span><h4>{copy.before}</h4><p>{copy.beforeText}</p></div>
          <div className="usluck-compare-pair"><figure><img src="/usluck/old-06-1.jpg" alt="US LUCK previous visual direction" /><figcaption>OLD DIRECTION · RED ONLY</figcaption></figure><i>→</i><figure><img src="/usluck/screen-red-lobby.png" alt="US LUCK redesigned visual direction" /><figcaption>NEW SYSTEM · RED + GREEN</figcaption></figure></div>
        </div>

        <a className="usluck-figma-link" href="https://www.figma.com/design/QBtYlaYDVVd3ErBAOHlqpQ/US-LUCK?node-id=1-2" target="_blank" rel="noreferrer">{copy.open} <span>↗</span></a>
      </div>
      {active !== null && <div className="lightbox usluck-lightbox" onClick={close} role="dialog" aria-modal="true"><button className="lb-close" aria-label="Close" onClick={close}>✕</button><button className="lb-nav lb-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev() }}>←</button><img src={`/usluck/${screens[active][0]}`} alt={screens[active][1]} onClick={(e) => e.stopPropagation()} /><button className="lb-nav lb-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); next() }}>→</button><span className="lb-counter">{String(active + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}</span></div>}
    </article>
  )
}
