import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { content } from './content.js'

const LangContext = createContext(null)

const VALID = ['zh', 'zhHant', 'en']
const HTML_LANG = { zh: 'zh-CN', zhHant: 'zh-Hant', en: 'en' }

// 首访默认语言：按浏览器语言推断（zh-HK/TW/Hant → 繁体，其他中文 → 简体，英文 → EN）
function detectByBrowser() {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of list) {
    const l = (raw || '').toLowerCase()
    if (l.startsWith('zh')) {
      return /hant|tw|hk|mo/.test(l) ? 'zhHant' : 'zh'
    }
    if (l.startsWith('en')) return 'en'
  }
  return 'zh'
}

/**
 * 语言状态：zh（简）| zhHant（繁）| en，localStorage 持久化。
 * 首访无记忆时：浏览器语言推断 → 再异步查 IP 归属，港/澳/台 IP 默认繁体
 * （仅当当前是简体且用户尚未手动选择时切换；查询发生在开场幕布期间，无闪切感）。
 */
export function LangProvider({ children }) {
  const firstVisitRef = useRef(null)
  if (firstVisitRef.current === null) {
    let saved = null
    try {
      saved = localStorage.getItem('lang')
    } catch {
      /* 隐私模式 */
    }
    firstVisitRef.current = { hadSaved: VALID.includes(saved), saved }
  }

  const [lang, setLangState] = useState(() =>
    firstVisitRef.current.hadSaved ? firstVisitRef.current.saved : detectByBrowser(),
  )
  const userTouchedRef = useRef(false)

  // 供 UI 调用：手动选择后不再被自动判断覆盖
  const setLang = (l) => {
    userTouchedRef.current = true
    setLangState(l)
  }

  // 首访且浏览器推断为简体时，查 IP 归属：港/澳/台 → 默认繁体
  useEffect(() => {
    if (firstVisitRef.current.hadSaved) return
    const ctrl = new AbortController()
    fetch('https://get.geojs.io/v1/ip/country.json', { signal: ctrl.signal })
      .then((r) => r.json())
      .then(({ country }) => {
        if (['HK', 'MO', 'TW'].includes(country)) {
          setLangState((prev) => (!userTouchedRef.current && prev === 'zh' ? 'zhHant' : prev))
        }
      })
      .catch(() => {})
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* 隐私模式下忽略 */
    }
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
