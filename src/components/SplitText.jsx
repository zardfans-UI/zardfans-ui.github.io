// 按字符分割文字，字符入场动画由 GSAP 统一编排（见 animations.js）
export default function SplitText({ text, className = '' }) {
  return (
    <span className={`split-text ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="split-char" aria-hidden="true">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
