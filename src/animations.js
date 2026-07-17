import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 移动端地址栏收起导致的 resize 不触发全量 refresh
ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * 全站动效编排（GSAP + ScrollTrigger)
 * - 开场：品牌幕布揭开 → hero 标题遮罩位移+压缩归位 → 其余元素级联
 * - 滚动：各模块大标题大幅进场，卡片 stagger，图片 clip 揭示 + 轻视差
 * 原则：
 * - 只动 transform / opacity / clip-path（letter-spacing 等布局属性会逐帧重排卡顿）
 * - 进场初始态不用横向正偏移（ScrollTrigger 触发前会一直横向撑出视口）
 * - 进场动画 once；结束 clearProps 恢复 CSS hover/tilt；尊重 reduced-motion
 * - 全部 ScrollTrigger 延迟到开场结束后创建：启动时批量创建要做 50+ 次布局测量，
 *   且 window load（图片/字体就绪，恰在开场播放中）会触发全量 refresh，正是开场卡顿来源
 */
export function initAnimations() {
  const mm = gsap.matchMedia()

  // 减少动态偏好：跳过全部动效，仅隐藏开场幕布
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.intro-overlay', { display: 'none' })
  })

  mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
    const isMobile = window.matchMedia('(max-width: 860px)').matches

    // 滚动进场元素先隐藏（纯样式写入，无布局读取，不阻塞开场）
    gsap.set(
      [
        '.section-head .cn',
        '.section-head .en',
        '.about-profile',
        '.about-current',
        '.about-stat',
        '.about-timeline li',
        '.strength-card',
        '.works-chapter-head',
        '.work-card',
        '.footer-title',
        '.footer-logo-pill',
        '.footer-card',
        '.footer-bar',
      ],
      { autoAlpha: 0 },
    )

    /* ---------------- 开场 opening ---------------- */
    // paused 起手：等 Galaxy 完成 WebGL 编译（zf:galaxy-ready）再起跑，
    // 让编译发生在黑幕静止盖屏期，幕布揭开时星空已就位；兜底 0.9s 后照常开播
    const opening = gsap.timeline({
      paused: true,
      defaults: { ease: 'power4.out' },
      // 开场收尾后再创建全部 ScrollTrigger（ctx.add 让 matchMedia 统一回收）
      onComplete: () => ctx.add(setupScrollAnimations),
    })

    let started = false
    const startOpening = () => {
      if (started) return
      started = true
      opening.play()
    }
    window.addEventListener('zf:galaxy-ready', startOpening, { once: true })
    gsap.delayedCall(0.9, startOpening)

    opening
      // 幕布上的品牌字标：纯 transform 进场（不动 letter-spacing，避免逐帧重排）
      .fromTo(
        '.intro-mark',
        { autoAlpha: 0, y: 18, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: 'power2.out' },
      )
      .to('.intro-mark', { autoAlpha: 0, y: -22, duration: 0.35, ease: 'power2.in' }, '+=0.12')
      // 幕布整体上移揭开
      .to('.intro-overlay', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.08')
      .set('.intro-overlay', { display: 'none' })
      // 星空背景容器：微缩放沉降（Galaxy 自身延迟挂载 + CSS 淡入）
      .fromTo(
        '.hero-bg',
        { autoAlpha: 0, scale: 1.12 },
        { autoAlpha: 1, scale: 1, duration: 1.7, ease: 'power2.out' },
        '-=0.95',
      )
      .fromTo('.nav', { yPercent: -120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, clearProps: 'transform' }, '-=1.5')
      // 主标题：遮罩内大位移 + 纵向压缩后归位
      .fromTo(
        '.hero-title-name',
        { yPercent: 132, scaleY: 1.6, transformOrigin: '0% 100%' },
        { yPercent: 0, scaleY: 1, duration: 1.05 },
        '-=1.45',
      )
      .fromTo(
        '.hero-title-word .split-char',
        { yPercent: 132 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.035,
          onComplete: () => gsap.set('.title-line', { overflow: 'visible' }),
        },
        '-=0.8',
      )
      // 手写体 slogan：遮罩释放后滑入
      .fromTo(
        '.hero-script',
        { autoAlpha: 0, x: 26, rotate: -2 },
        { autoAlpha: 1, x: 0, rotate: -7, duration: 0.7, ease: 'power3.out' },
        '-=0.25',
      )
      .fromTo('.hero-badge', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.85')
      .fromTo('.hero-desc', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.72')
      .fromTo('.hero-actions', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.62')
      .fromTo('.hero-bottom', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, '-=0.5')

    /* ---------------- 滚动进场（开场结束后创建） ---------------- */
    function setupScrollAnimations() {
      // 模块大标题：大幅位移 + 微斜切归正
      gsap.utils.toArray('.section-head').forEach((head) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: head, start: 'top 86%', once: true },
          defaults: { ease: 'power4.out' },
        })
        tl.fromTo(
          head.querySelector('.cn'),
          { y: 110, autoAlpha: 0, skewY: 3 },
          { y: 0, autoAlpha: 1, skewY: 0, duration: 1.0 },
        ).fromTo(
          head.querySelector('.en'),
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.2,
        )
      })

      // 个人经历：左侧个人卡先起，右侧经历卡稍晚错开，同为自下而上
      gsap.fromTo(
        '.about-profile',
        { y: 90, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          ease: 'power4.out',
          clearProps: 'transform', // 释放 transform，恢复 CSS 的 3D 倾斜交互
          scrollTrigger: { trigger: '.about-grid', start: 'top 78%', once: true },
        },
      )
      gsap.fromTo(
        '.about-current',
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          delay: 0.16,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 78%', once: true },
        },
      )
      gsap.fromTo(
        '.about-stat',
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.about-stats', start: 'top 88%', once: true },
        },
      )
      gsap.fromTo(
        '.about-timeline li',
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-timeline', start: 'top 84%', once: true },
        },
      )

      // 个人优势：卡片 stagger
      gsap.fromTo(
        '.strength-card',
        { y: 90, autoAlpha: 0, scale: 0.97 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: 'power4.out',
          clearProps: 'transform', // 恢复 hover 上浮
          scrollTrigger: { trigger: '.strengths-grid', start: 'top 82%', once: true },
        },
      )

      // 作品集（吸顶章节导航不做入场动画——sticky 元素配合初始隐藏的触发时机不可靠）
      gsap.utils.toArray('.works-chapter-head').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // 作品卡：整卡上移 + 画框 clip 揭示 + 图片回缩（幅度克制），随后释放 transform 恢复 hover
      gsap.utils.toArray('.work-card').forEach((card) => {
        const frame = card.querySelector('.work-frame')
        const img = card.querySelector('img')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          defaults: { ease: 'power4.out' },
        })
        tl.fromTo(card, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, clearProps: 'transform' })
          .fromTo(
            frame,
            { clipPath: 'inset(6% 4% 6% 4% round 20px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 0.85, clearProps: 'clipPath' },
            0.05,
          )
        // 动效演示卡内是 video 而非 img
        if (img) tl.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.0, ease: 'power3.out', clearProps: 'transform' }, 0)

        // 轻视差：画框在滚动中缓慢漂移（移动端关闭省电）
        if (!isMobile) {
          gsap.fromTo(
            frame,
            { y: 16 },
            {
              y: -16,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          )
        }
      })

      // 收尾页
      const footerTl = gsap.timeline({
        scrollTrigger: { trigger: '.footer-grid', start: 'top 74%', once: true },
        defaults: { ease: 'power4.out' },
      })
      footerTl
        .fromTo('.footer-title', { y: 110, autoAlpha: 0, skewY: 3 }, { y: 0, autoAlpha: 1, skewY: 0, duration: 1.1 })
        .fromTo('.footer-logo-pill', { autoAlpha: 0, y: 24, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, 0.35)
        .fromTo('.footer-card', { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.0 }, 0.15)
        .fromTo('.footer-bar', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 0.6)
    }

    // matchMedia revert 时移除事件监听（delayedCall 由 gsap 上下文自动回收）
    return () => window.removeEventListener('zf:galaxy-ready', startOpening)
  })

  return () => mm.revert()
}
