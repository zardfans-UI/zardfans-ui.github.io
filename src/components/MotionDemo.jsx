import { useEffect, useRef } from 'react'

/**
 * 作品集内的动效演示卡：多部手机视频依次循环播放（1→2→3→1…），不同时播。
 * 点击任一视频暂停整个循环，再次点击从暂停处继续。
 * iOS WebKit 外壳（如 Chrome iOS）的自动播放兼容：
 * - React 不会把 muted 渲染成 HTML 属性，部分外壳的自动播放策略按属性判定 → 用 ref 强制补上
 * - 配 poster 海报帧，即使自动播放被拒也不黑屏
 */
export default function MotionDemo({ demo }) {
  const rootRef = useRef(null)
  // 播放循环状态：当前索引 / 用户是否手动暂停 / 是否在视口内
  const stateRef = useRef({ idx: 0, userPaused: false, inView: false })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const videos = [...root.querySelectorAll('video')]
    const s = stateRef.current

    const forceMuted = (v) => {
      v.muted = true
      v.setAttribute('muted', '')
    }
    videos.forEach(forceMuted)

    const playCurrent = () => {
      const v = videos[s.idx]
      if (v) v.play().catch(() => {})
    }
    const pauseAll = () => videos.forEach((v) => v.pause())

    // 播完切下一个，循环
    const onEnded = () => {
      s.idx = (s.idx + 1) % videos.length
      if (s.inView && !s.userPaused) {
        const v = videos[s.idx]
        v.currentTime = 0
        playCurrent()
      }
    }

    // 数据就绪后若轮到自己且在视口内，补一次播放（应对首次加载慢）
    const onLoaded = (e) => {
      if (videos[s.idx] === e.target && s.inView && !s.userPaused) playCurrent()
    }

    // 点击：暂停/继续整个循环
    const onClick = () => {
      if (s.userPaused) {
        s.userPaused = false
        playCurrent()
      } else {
        s.userPaused = true
        pauseAll()
      }
    }

    videos.forEach((v) => {
      v.addEventListener('ended', onEnded)
      v.addEventListener('loadeddata', onLoaded)
      v.addEventListener('click', onClick)
    })

    const io = new IntersectionObserver(
      ([entry]) => {
        s.inView = entry.isIntersecting
        if (entry.isIntersecting) {
          if (!s.userPaused) playCurrent()
        } else {
          pauseAll()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(root)

    return () => {
      io.disconnect()
      videos.forEach((v) => {
        v.removeEventListener('ended', onEnded)
        v.removeEventListener('loadeddata', onLoaded)
        v.removeEventListener('click', onClick)
      })
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
                playsInline
                preload="auto"
              />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}
