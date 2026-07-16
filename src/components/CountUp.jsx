import { useEffect, useRef } from 'react'

// 数字滚动动效：进入视口后从 0 滚动到目标值，支持 "-16.7%" / "+10.2%" 这类格式
export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = String(value).match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/)
    if (!match) {
      el.textContent = value
      return
    }
    const [, sign, numStr, suffix] = match
    const target = parseFloat(numStr)
    const decimals = (numStr.split('.')[1] || '').length

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value
      return
    }

    el.textContent = `${sign}0${decimals ? '.' + '0'.repeat(decimals) : ''}${suffix}`

    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4) // easeOutQuart
          el.textContent = `${sign}${(target * eased).toFixed(decimals)}${suffix}`
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return <span ref={ref}>{value}</span>
}
