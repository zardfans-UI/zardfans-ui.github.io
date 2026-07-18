// 站点全部文案与数据（简体/繁体/英文三语），语言状态见 LangContext.jsx
// 原则：中文态下本就是英文的文案（PORTFOLIO、章节英文副标等）各语言下保持不变
// 注意：改文案需同步 zh / zhHant / en 三份；繁体作品图无独立版本，沿用简体图

// 作品集图片：中英各一套（public/portfolio/cn|en/），随语言切换；封底页不展示
const makeWorks = (dir) =>
  Array.from({ length: 43 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return { id: n, src: `/portfolio/${dir}/p${n}.webp`, alt: `Portfolio P.${n}` }
  })

const zh = {
  works: makeWorks('cn'),
  // 动效演示：插在作品集第 31 页（猜正反面/迎财神）下方
  motionDemo: {
    afterPage: '31',
    badge: 'MOTION DEMO',
    items: [
      { src: '/videos/gift-box.mp4', label: '礼盒打包 · 赠送好友' },
      { src: '/videos/coin-flip.mp4', label: '猜正反面 · 奖金翻倍' },
      { src: '/videos/god-of-wealth.mp4', label: '迎财神 · 得奖金' },
    ],
  },
  ui: {
    navLinks: [
      { id: 'about', label: '个人经历' },
      { id: 'strengths', label: '个人优势' },
      { id: 'works', label: '近期作品' },
    ],
    contact: '联系我',
    viewWorks: '查看作品',
    viewLarge: '查看大图 +',
    nowTag: 'NOW · 最近经历',
    sectionAbout: '个人经历',
    sectionStrengths: '个人优势',
    sectionWorks: '近期作品集',
    heroDesc1: '陈瑞跃 · 高级 UI/UX 设计师，10 年设计经验 · 5 年出海产品',
    heroDesc2: '专注复杂商业产品的多场景适配设计，多次主导项目从 0 到 1',
    slogan: '「 专注于复杂商业产品的多场景设计 」',
    backToTop: '回到顶部',
    lightbox: { close: '关闭', prev: '上一页', next: '下一页' },
  },
  site: {
    name: '陈瑞跃',
    alias: 'ZARDFANS',
    title: '高级 UI/UX 设计师',
    years: '2023 - 2026',
    exp: '10 年设计经验',
    intro:
      '专注复杂交易类产品的体验设计与设计系统建设，擅长在高信息密度、多状态反馈与资金敏感场景下，建立清晰、可信、可扩展的交易体验。多次主导项目从 0 到 1，均有数据验证。',
    contacts: [
      { label: 'WeChat', value: '158 6074 3962', href: null },
      { label: 'WhatsApp', value: '852 5233 1573', href: null },
      { label: 'Email', value: '929671507@qq.com', href: 'mailto:929671507@qq.com' },
      { label: 'ZCOOL', value: 'zcool.com.cn/u/2901784', href: 'https://www.zcool.com.cn/u/2901784' },
      { label: 'Dribbble', value: 'dribbble.com/zardfans', href: 'https://dribbble.com/zardfans' },
    ],
  },
  currentJob: {
    company: 'HONG KONG NOVA LIMITED',
    role: 'UI 高级设计师',
    period: '2023.11 — 2026.07',
    location: '出海 · 交易类产品',
    summary:
      '负责三条交易类产品线（综合竞猜平台 App/Web、多语言刮刮乐平台、直播竞猜）的体验设计与设计系统建设，覆盖高频操作、资金感知、多状态反馈等复杂交易场景。',
    highlights: [
      '主导竞猜平台 App/Web 体验升级，重构大厅与竞猜页信息层级，提出核心操作模块「布局无关化」策略',
      '从 0 到 1 搭建 App/Web 双端设计系统：语义化 token + 1920—H5 响应式断点规范',
      '制定中/英/越/西多语言弹性布局规则，主题拆解为 5 个可替换视觉变量，「换主题不重做」',
      '建立 AI 设计提效工作流：AI 效果图 → 前端还原 → Figma 可编辑设计稿全链路',
    ],
    stats: [
      { value: '-16.7%', label: '上线当月大厅流失率环比', good: 'down' },
      { value: '+10.2%', label: '竞猜完成率环比', good: 'up' },
      { value: '+26.5%', label: 'Web 竞猜页停留时长环比', good: 'up' },
      { value: '-33.1%', label: '单主题 UI 开发周期', good: 'down' },
    ],
  },
  pastJobs: [
    {
      company: '深圳刀锋互娱网络科技',
      role: '高级 UI 设计师',
      period: '2021.08 — 2023.08',
      desc: 'UGGame（海外租号玩）、FUNBOX（盲盒电商）双业务线全端设计。FUNBOX 从 0 到 1，一个月完成 v1.0 共 43 页；设计开发效率提升近 70%。',
    },
    {
      company: '实创时新（北京）科技',
      role: 'UX 设计师',
      period: '2020.07 — 2021.06',
      desc: '网盘产品「安全星球」v0.1—v2.8 全端设计迭代，上线不到一年累计用户 12 万。',
    },
    {
      company: '深圳市骏昊顺科技',
      role: 'UX 设计师',
      period: '2019.11 — 2020.06',
      desc: '「江鸟民宿」小程序、消防管理系统 Web/App、数据大屏从立项到迭代的全流程设计。',
    },
    {
      company: '厦门跨境网信息技术',
      role: 'UI 设计师',
      period: '2018.06 — 2019.03',
      desc: '跨境电商国际站/国内站前后台与小程序 UI 设计，主持设计评审。',
    },
    {
      company: '宇鑫（厦门）货币兑换',
      role: 'UI 设计师',
      period: '2016.06 — 2018.04',
      desc: 'B 端业务报表 App、后台系统与官网的交互、视觉与动效设计，制定设计规范。',
    },
  ],
  strengths: [
    {
      num: '01',
      title: '复杂交易产品',
      en: 'COMPLEX TRADING',
      desc: '10 年覆盖 C 端交易、电商、工具、B 端产品，近 3 年深耕高频交易与资金敏感场景，擅长在高信息密度下建立清晰、可信、可扩展的交易体验。',
    },
    {
      num: '02',
      title: '方法论',
      en: 'METHODOLOGY',
      desc: '「先锁定不变量，再系统化开放变量」——先定义操作路径、反馈与视觉权重等不变核心，再将变化拆解为变量清单与设计 token，让适配从「重做」降级为「替换」。',
    },
    {
      num: '03',
      title: 'AI 工作流',
      en: 'AI WORKFLOW',
      desc: '设计系统封装为 AI Skill，跑通 AI 效果图到可编辑设计稿的自动还原链路，Figma Agent 批量多语言调整落地实战。人定义不变量与规则，AI 执行规模。',
    },
    {
      num: '04',
      title: '国际化与本地化',
      en: 'GLOBALIZATION',
      desc: '5 年出海产品经验，结合 Hofstede 文化模型与用户调研制定国际化与本地化设计策略，覆盖中 / 英 / 越 / 西等多语言场景。',
    },
    {
      num: '05',
      title: '设计系统建设',
      en: 'DESIGN SYSTEM',
      desc: '多次主导组件库、设计规范、语义化 token 体系从 0 到 1 落地，支撑多玩法、多主题、多端快速扩展，效率提升均有量化数据。',
    },
    {
      num: '06',
      title: '协作与韧性',
      en: 'COLLABORATION',
      desc: '跨团队协同保障 UI 还原度与体验质量，能短期承受高强度交付使项目如期上线，乐于在团队内分享方法论。',
    },
  ],
  workChapters: [
    { id: 'overview', num: 'A', title: '开篇 · 能力矩阵', en: 'OVERVIEW & SKILL MATRIX', start: 1, end: 2 },
    { id: 'king', num: 'B', title: '「皇者」竞猜交易平台', en: 'KING GROUP · TRADING APP/WEB', start: 3, end: 18 },
    { id: 'fun', num: 'C', title: '「全民乐」刮刮乐平台 H5', en: 'FUN FOR ALL · SCRATCH H5', start: 19, end: 31 },
    { id: 'live', num: 'D', title: '直播平台竞猜 H5', en: 'LIVE STREAMING BETTING H5', start: 32, end: 39 },
    { id: 'ai', num: 'E', title: 'AI 提效 & 设计方法论', en: 'AI WORKFLOW & METHODOLOGY', start: 40, end: 43 },
  ],
}

const zhHant = {
  works: makeWorks('cn'), // 繁体沿用简体作品图
  motionDemo: {
    afterPage: '31',
    badge: 'MOTION DEMO',
    items: [
      { src: '/videos/gift-box.mp4', label: '禮盒打包 · 贈送好友' },
      { src: '/videos/coin-flip.mp4', label: '猜正反面 · 獎金翻倍' },
      { src: '/videos/god-of-wealth.mp4', label: '迎財神 · 得獎金' },
    ],
  },
  ui: {
    navLinks: [
      { id: 'about', label: '個人經歷' },
      { id: 'strengths', label: '個人優勢' },
      { id: 'works', label: '近期作品' },
    ],
    contact: '聯絡我',
    viewWorks: '查看作品',
    viewLarge: '查看大圖 +',
    nowTag: 'NOW · 最近經歷',
    sectionAbout: '個人經歷',
    sectionStrengths: '個人優勢',
    sectionWorks: '近期作品集',
    heroDesc1: '陳瑞躍 · 高級 UI/UX 設計師，10 年設計經驗 · 5 年出海產品',
    heroDesc2: '專注複雜商業產品的多場景適配設計，多次主導項目從 0 到 1',
    slogan: '「 專注於複雜商業產品的多場景設計 」',
    backToTop: '回到頂部',
    lightbox: { close: '關閉', prev: '上一頁', next: '下一頁' },
  },
  site: {
    name: '陳瑞躍',
    alias: 'ZARDFANS',
    title: '高級 UI/UX 設計師',
    years: '2023 - 2026',
    exp: '10 年設計經驗',
    intro:
      '專注複雜交易類產品的體驗設計與設計系統建設，擅長在高資訊密度、多狀態反饋與資金敏感場景下，建立清晰、可信、可擴展的交易體驗。多次主導項目從 0 到 1，均有數據驗證。',
    contacts: [
      { label: 'WeChat', value: '158 6074 3962', href: null },
      { label: 'WhatsApp', value: '852 5233 1573', href: null },
      { label: 'Email', value: '929671507@qq.com', href: 'mailto:929671507@qq.com' },
      { label: 'ZCOOL', value: 'zcool.com.cn/u/2901784', href: 'https://www.zcool.com.cn/u/2901784' },
      { label: 'Dribbble', value: 'dribbble.com/zardfans', href: 'https://dribbble.com/zardfans' },
    ],
  },
  currentJob: {
    company: 'HONG KONG NOVA LIMITED',
    role: 'UI 高級設計師',
    period: '2023.11 — 2026.07',
    location: '出海 · 交易類產品',
    summary:
      '負責三條交易類產品線（綜合競猜平台 App/Web、多語言刮刮樂平台、直播競猜）的體驗設計與設計系統建設，覆蓋高頻操作、資金感知、多狀態反饋等複雜交易場景。',
    highlights: [
      '主導競猜平台 App/Web 體驗升級，重構大廳與競猜頁資訊層級，提出核心操作模組「佈局無關化」策略',
      '從 0 到 1 搭建 App/Web 雙端設計系統：語義化 token + 1920—H5 響應式斷點規範',
      '制定中/英/越/西多語言彈性佈局規則，主題拆解為 5 個可替換視覺變量，「換主題不重做」',
      '建立 AI 設計提效工作流：AI 效果圖 → 前端還原 → Figma 可編輯設計稿全鏈路',
    ],
    stats: [
      { value: '-16.7%', label: '上線當月大廳流失率環比', good: 'down' },
      { value: '+10.2%', label: '競猜完成率環比', good: 'up' },
      { value: '+26.5%', label: 'Web 競猜頁停留時長環比', good: 'up' },
      { value: '-33.1%', label: '單主題 UI 開發週期', good: 'down' },
    ],
  },
  pastJobs: [
    {
      company: '深圳刀鋒互娛網絡科技',
      role: '高級 UI 設計師',
      period: '2021.08 — 2023.08',
      desc: 'UGGame（海外租號玩）、FUNBOX（盲盒電商）雙業務線全端設計。FUNBOX 從 0 到 1，一個月完成 v1.0 共 43 頁；設計開發效率提升近 70%。',
    },
    {
      company: '實創時新（北京）科技',
      role: 'UX 設計師',
      period: '2020.07 — 2021.06',
      desc: '網盤產品「安全星球」v0.1—v2.8 全端設計迭代，上線不到一年累計用戶 12 萬。',
    },
    {
      company: '深圳市駿昊順科技',
      role: 'UX 設計師',
      period: '2019.11 — 2020.06',
      desc: '「江鳥民宿」小程序、消防管理系統 Web/App、數據大屏從立項到迭代的全流程設計。',
    },
    {
      company: '廈門跨境網信息技術',
      role: 'UI 設計師',
      period: '2018.06 — 2019.03',
      desc: '跨境電商國際站/國內站前後台與小程序 UI 設計，主持設計評審。',
    },
    {
      company: '宇鑫（廈門）貨幣兌換',
      role: 'UI 設計師',
      period: '2016.06 — 2018.04',
      desc: 'B 端業務報表 App、後台系統與官網的交互、視覺與動效設計，制定設計規範。',
    },
  ],
  strengths: [
    {
      num: '01',
      title: '複雜交易產品',
      en: 'COMPLEX TRADING',
      desc: '10 年覆蓋 C 端交易、電商、工具、B 端產品，近 3 年深耕高頻交易與資金敏感場景，擅長在高資訊密度下建立清晰、可信、可擴展的交易體驗。',
    },
    {
      num: '02',
      title: '方法論',
      en: 'METHODOLOGY',
      desc: '「先鎖定不變量，再系統化開放變量」——先定義操作路徑、反饋與視覺權重等不變核心，再將變化拆解為變量清單與設計 token，讓適配從「重做」降級為「替換」。',
    },
    {
      num: '03',
      title: 'AI 工作流',
      en: 'AI WORKFLOW',
      desc: '設計系統封裝為 AI Skill，跑通 AI 效果圖到可編輯設計稿的自動還原鏈路，Figma Agent 批量多語言調整落地實戰。人定義不變量與規則，AI 執行規模。',
    },
    {
      num: '04',
      title: '國際化與本地化',
      en: 'GLOBALIZATION',
      desc: '5 年出海產品經驗，結合 Hofstede 文化模型與用戶調研制定國際化與本地化設計策略，覆蓋中 / 英 / 越 / 西等多語言場景。',
    },
    {
      num: '05',
      title: '設計系統建設',
      en: 'DESIGN SYSTEM',
      desc: '多次主導組件庫、設計規範、語義化 token 體系從 0 到 1 落地，支撐多玩法、多主題、多端快速擴展，效率提升均有量化數據。',
    },
    {
      num: '06',
      title: '協作與韌性',
      en: 'COLLABORATION',
      desc: '跨團隊協同保障 UI 還原度與體驗質量，能短期承受高強度交付使項目如期上線，樂於在團隊內分享方法論。',
    },
  ],
  workChapters: [
    { id: 'overview', num: 'A', title: '開篇 · 能力矩陣', en: 'OVERVIEW & SKILL MATRIX', start: 1, end: 2 },
    { id: 'king', num: 'B', title: '「皇者」競猜交易平台', en: 'KING GROUP · TRADING APP/WEB', start: 3, end: 18 },
    { id: 'fun', num: 'C', title: '「全民樂」刮刮樂平台 H5', en: 'FUN FOR ALL · SCRATCH H5', start: 19, end: 31 },
    { id: 'live', num: 'D', title: '直播平台競猜 H5', en: 'LIVE STREAMING BETTING H5', start: 32, end: 39 },
    { id: 'ai', num: 'E', title: 'AI 提效 & 設計方法論', en: 'AI WORKFLOW & METHODOLOGY', start: 40, end: 43 },
  ],
}

const en = {
  works: makeWorks('en'),
  motionDemo: {
    afterPage: '31',
    badge: 'MOTION DEMO',
    items: [
      { src: '/videos/gift-box.mp4', label: 'Gift Box · Send to a Friend' },
      { src: '/videos/coin-flip.mp4', label: 'Coin Flip · Double the Bonus' },
      { src: '/videos/god-of-wealth.mp4', label: 'God of Wealth · Bonus' },
    ],
  },
  ui: {
    navLinks: [
      { id: 'about', label: 'Experience' },
      { id: 'strengths', label: 'Strengths' },
      { id: 'works', label: 'Works' },
    ],
    contact: 'Contact',
    viewWorks: 'View Works',
    viewLarge: 'View +',
    nowTag: 'NOW · CURRENT',
    sectionAbout: 'Experience',
    sectionStrengths: 'Strengths',
    sectionWorks: 'Selected Works',
    heroDesc1: 'Ruiyue Chen · Senior UI/UX Designer, 10 yrs in design · 5 yrs global products',
    heroDesc2: 'Multi-scenario design for complex commercial products, led multiple 0-to-1 projects',
    slogan: '「 Multi-scenario design for complex commercial products 」',
    backToTop: 'Back to top',
    lightbox: { close: 'Close', prev: 'Previous', next: 'Next' },
  },
  site: {
    name: 'Ruiyue Chen',
    alias: 'ZARDFANS',
    title: 'Senior UI/UX Designer',
    years: '2023 - 2026',
    exp: '10 yrs experience',
    intro:
      'Focused on UX and design systems for complex trading products — building clear, trustworthy and scalable experiences under high information density, multi-state feedback and real-money scenarios. Led multiple 0-to-1 projects, all validated by data.',
    contacts: [
      { label: 'WeChat', value: '158 6074 3962', href: null },
      { label: 'WhatsApp', value: '852 5233 1573', href: null },
      { label: 'Email', value: '929671507@qq.com', href: 'mailto:929671507@qq.com' },
      { label: 'ZCOOL', value: 'zcool.com.cn/u/2901784', href: 'https://www.zcool.com.cn/u/2901784' },
      { label: 'Dribbble', value: 'dribbble.com/zardfans', href: 'https://dribbble.com/zardfans' },
    ],
  },
  currentJob: {
    company: 'HONG KONG NOVA LIMITED',
    role: 'Senior UI Designer',
    period: '2023.11 — 2026.07',
    location: 'Global · Trading products',
    summary:
      'Owned UX and design systems for three trading product lines (betting platform App/Web, multilingual scratch-card platform, live betting), covering high-frequency operations, fund awareness and multi-state feedback.',
    highlights: [
      'Led App/Web experience upgrade: restructured lobby & betting page hierarchy with a layout-agnostic core-module strategy',
      'Built the App/Web design system from 0 to 1: semantic tokens + 1920–H5 responsive breakpoints',
      'Defined elastic layout rules for CN/EN/VI/ES; split themes into 5 swappable visual variables — reskin without rework',
      'Established an AI workflow: AI mockup → code restore → editable Figma files',
    ],
    stats: [
      { value: '-16.7%', label: 'Lobby churn rate MoM', good: 'down' },
      { value: '+10.2%', label: 'Betting completion MoM', good: 'up' },
      { value: '+26.5%', label: 'Web dwell time MoM', good: 'up' },
      { value: '-33.1%', label: 'Per-theme UI dev cycle', good: 'down' },
    ],
  },
  pastJobs: [
    {
      company: 'Shenzhen Daofeng Interactive',
      role: 'Senior UI Designer',
      period: '2021.08 — 2023.08',
      desc: 'Full-platform design for UGGame and FUNBOX (blind-box e-commerce). FUNBOX 0-to-1: 43 pages of v1.0 in one month; design-dev efficiency up ~70%.',
    },
    {
      company: 'Shichuang Shixin (Beijing)',
      role: 'UX Designer',
      period: '2020.07 — 2021.06',
      desc: 'Full-platform iteration of cloud-drive product "Safety Planet" v0.1–v2.8; 120K users within the first year.',
    },
    {
      company: 'Shenzhen Junhaoshun Tech',
      role: 'UX Designer',
      period: '2019.11 — 2020.06',
      desc: 'End-to-end design for a homestay mini-program, fire-safety system Web/App and data dashboards.',
    },
    {
      company: 'Xiamen Kuajingwang InfoTech',
      role: 'UI Designer',
      period: '2018.06 — 2019.03',
      desc: 'UI design for cross-border e-commerce sites and mini-program; led design reviews.',
    },
    {
      company: 'Yuxin (Xiamen) Currency Exchange',
      role: 'UI Designer',
      period: '2016.06 — 2018.04',
      desc: 'Interaction, visual and motion design for B-side reporting App, admin systems and official site; set design guidelines.',
    },
  ],
  strengths: [
    {
      num: '01',
      title: 'Complex Trading Products',
      en: 'COMPLEX TRADING',
      desc: '10 years across C-side trading, e-commerce, tools and B-side products; 3 recent years deep in high-frequency, real-money scenarios — clear, trustworthy, scalable experiences under high density.',
    },
    {
      num: '02',
      title: 'Methodology',
      en: 'METHODOLOGY',
      desc: '"Lock the invariants, then systematize the variables" — define operation paths, feedback and visual weight first, then break changes into variable lists and design tokens, downgrading adaptation from rework to replacement.',
    },
    {
      num: '03',
      title: 'AI Workflow',
      en: 'AI WORKFLOW',
      desc: 'Design system packaged as an AI Skill; proven pipeline from AI mockups to editable Figma files; Figma Agent for batch multilingual updates. Humans define rules, AI executes at scale.',
    },
    {
      num: '04',
      title: 'Globalization',
      en: 'GLOBALIZATION',
      desc: '5 years on global products; i18n and localization strategies informed by the Hofstede model and user research, covering CN / EN / VI / ES scenarios.',
    },
    {
      num: '05',
      title: 'Design Systems',
      en: 'DESIGN SYSTEM',
      desc: 'Led component libraries, design guidelines and semantic token systems from 0 to 1, powering fast expansion across game types, themes and platforms — all gains quantified.',
    },
    {
      num: '06',
      title: 'Collaboration',
      en: 'COLLABORATION',
      desc: 'Cross-team collaboration ensuring UI fidelity and experience quality; resilient under intensive delivery to ship on time; happy to share methodology within the team.',
    },
  ],
  workChapters: [
    { id: 'overview', num: 'A', title: 'Overview · Skill Matrix', en: 'OVERVIEW & SKILL MATRIX', start: 1, end: 2 },
    { id: 'king', num: 'B', title: '"KING" Betting Platform', en: 'KING GROUP · TRADING APP/WEB', start: 3, end: 18 },
    { id: 'fun', num: 'C', title: '"FUN FOR ALL" Scratch H5', en: 'FUN FOR ALL · SCRATCH H5', start: 19, end: 31 },
    { id: 'live', num: 'D', title: 'Live Betting H5', en: 'LIVE STREAMING BETTING H5', start: 32, end: 39 },
    { id: 'ai', num: 'E', title: 'AI Workflow & Methodology', en: 'AI WORKFLOW & METHODOLOGY', start: 40, end: 43 },
  ],
}

export const content = { zh, zhHant, en }
