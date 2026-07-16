import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 自托管手写体（hero slogan 用），保证 iOS/Android/Windows 渲染一致
import '@fontsource/caveat/500.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
