import { useEffect, useRef } from 'react'

// 作品集内的动效演示卡：双手机视频并排，进入视口自动静音循环播放，滚出暂停
export default function MotionDemo({ demo }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const videos = root.querySelectorAll('video')
    const io = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((v) => {
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0.25 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  return (
    <figure className="work-card work-card--wide work-motion" ref={rootRef}>
      <div className="work-frame motion-frame">
        <span className="motion-badge">◉ {demo.badge}</span>
        <div className="motion-items">
          {demo.items.map((item) => (
            <div className="motion-item" key={item.src}>
              <video src={item.src} muted loop playsInline preload="metadata" />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
