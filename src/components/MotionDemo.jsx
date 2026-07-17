import { useEffect, useRef } from 'react'

/**
 * 作品集内的动效演示卡：多部手机视频并排，进入视口自动静音循环播放，滚出暂停。
 * iOS WebKit 外壳（如 Chrome iOS）的自动播放兼容：
 * - React 不会把 muted 渲染成 HTML 属性，部分外壳的自动播放策略按属性判定 → 用 ref 强制补上
 * - 配 poster 海报帧，即使自动播放被拒也不黑屏
 * - loadeddata 后重试播放；点击视频可手动播/暂停兜底
 */
export default function MotionDemo({ demo }) {
  const rootRef = useRef(null)
  const inViewRef = useRef(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const videos = [...root.querySelectorAll('video')]

    const tryPlay = (v) => {
      v.muted = true
      v.setAttribute('muted', '')
      v.play().catch(() => {})
    }

    const onLoaded = (e) => {
      if (inViewRef.current) tryPlay(e.target)
    }
    videos.forEach((v) => {
      v.muted = true
      v.setAttribute('muted', '')
      v.addEventListener('loadeddata', onLoaded)
    })

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        videos.forEach((v) => {
          if (entry.isIntersecting) tryPlay(v)
          else v.pause()
        })
      },
      { threshold: 0.25 },
    )
    io.observe(root)

    return () => {
      io.disconnect()
      videos.forEach((v) => v.removeEventListener('loadeddata', onLoaded))
    }
  }, [])

  return (
    <figure className="work-card work-card--wide work-motion" ref={rootRef}>
      <div className="work-frame motion-frame">
        <span className="motion-badge">◉ {demo.badge}</span>
        <div className="motion-items">
          {demo.items.map((item) => (
            <div className="motion-item" key={item.src}>
              <video
                src={item.src}
                poster={item.src.replace('.mp4', '-poster.jpg')}
                muted
                loop
                playsInline
                preload="auto"
                onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play().catch(() => {}) : e.currentTarget.pause())}
              />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
