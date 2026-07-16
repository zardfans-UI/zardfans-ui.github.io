import { createContext, useContext, useEffect, useState } from 'react'
import { content } from './content.js'

const LangContext = createContext(null)

// 语言状态：zh | en，记忆到 localStorage；t 为当前语言的文案包
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      return saved === 'en' ? 'en' : 'zh'
    } catch {
      return 'zh'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* 隐私模式下忽略 */
    }
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
