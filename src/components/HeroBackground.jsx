import { lazy, memo, Suspense, useEffect, useState } from 'react'

// Galaxy 依赖 ogl（WebGL），拆成独立 chunk 懒加载，不阻塞首屏主包
const Galaxy = lazy(() => import('./Galaxy.jsx'))

/**
 * Hero 背景：React Bits 的 Galaxy 星空着色器。
 * 视频层先用 HEAD 请求探测 public/hero.mp4 是否真实存在（避免每次加载都发一个
 * 注定失败的媒体请求，生产环境 SPA 回退还会把 HTML 当视频下载），存在才挂载。
 */
function HeroBackground() {
  const [videoOk, setVideoOk] = useState(false)
  // Galaxy 立即挂载：WebGL 编译发生在开场起跑前、黑幕静止盖屏期间（无感知）。
  // 开场时间线会等 Galaxy 广播 zf:galaxy-ready 后才播放（见 animations.js）。

  useEffect(() => {
    const ctrl = new AbortController()
    fetch('/hero.mp4', { method: 'HEAD', signal: ctrl.signal })
      .then((r) => {
        const type = r.headers.get('content-type') || ''
        if (r.ok && type.startsWith('video')) setVideoOk(true)
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  return (
    <div className="hero-bg" aria-hidden="true">
      {/* 视频背景生效时卸载星空，释放 WebGL/GPU；探测前的短暂挂载藏在开场幕布后，无感知 */}
      {!videoOk && (
        <Suspense fallback={null}>
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={0.3}
            glowIntensity={0.2}
            saturation={0.5}
            hueShift={240}
            twinkleIntensity={0.2}
            rotationSpeed={0}
            repulsionStrength={0.5}
            starSpeed={0.1}
            speed={0.2}
            className="hero-bg-galaxy"
          />
        </Suspense>
      )}
      {videoOk && <video className="hero-bg-video" src="/hero.mp4" autoPlay muted loop playsInline />}
      <div className="hero-bg-mask" />
    </div>
  )
}

// 无 props，memo 隔离父级（语言切换等）重渲染，避免 WebGL 背景被无谓重建
export default memo(HeroBackground)
